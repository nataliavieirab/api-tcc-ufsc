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

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private readonly tenantService: TenantService,
    private readonly currentRequestService: CurrentRequestService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload): Promise<User> {
    if (payload.orgId) this.tenantService.switchTenant(payload.orgId);

    const user = await this.userService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    this.currentRequestService.setCurrentUser(user);

    return user;
  }
}
