import { config } from 'dotenv';
config();

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from '../models/UserPayload';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/domains/user.service';
import { UnauthorizedError } from 'src/errors/unauthorized.error';
import { TenantService } from 'src/services/application/tenant.service';
import { CurrentRequestService } from 'src/services/application/current-request.service';
import { CustomerService } from 'src/services/domains/customer.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly tenantService: TenantService,
    private readonly currentRequestService: CurrentRequestService,
    private readonly customerService: CustomerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload): Promise<User> {
    if (payload.orgId) this.tenantService.switchTenant(payload.orgId);

    const customer = await this.customerService.findById(payload.sub);

    if (customer) {
      customer.password = undefined;
      this.currentRequestService.setCurrentCustomer(customer);

      return customer as unknown as User;
    }

    const user = await this.userService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedError('User not found');
    }
    user.password = undefined;
    this.currentRequestService.setCurrentUser(user);

    return user;
  }
}
