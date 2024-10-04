import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from '../models/UserPayload';
import { UserRepository } from 'src/repositories/user-repository';
import { UnauthorizedError } from '../errors/unauthorized.error';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload): Promise<User> {
    const user = this.userRepository.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    return user;
  }
}
