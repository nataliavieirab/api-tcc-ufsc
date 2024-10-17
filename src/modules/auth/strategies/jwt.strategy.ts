import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from '../models/UserPayload';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/domains/user.service';
import { UnauthorizedError } from 'src/errors/unauthorized.error';
import { TenantService } from 'src/services/application/tenant.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private readonly tenantService: TenantService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload): Promise<User> {
    if (payload.orgId) this.tenantService.switchTenant(payload.orgId);

    const user = this.userService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    return user;
  }
}
