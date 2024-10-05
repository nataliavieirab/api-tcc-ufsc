import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserPayload } from 'src/modules/auth/models/UserPayload';
import { UserToken } from 'src/modules/auth/models/UserToken';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { UnauthorizedError } from 'src/errors/unauthorized.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      iat: Date.now(),
      expt: Date.now() + 1000 * 60 * 60 * 24,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    userIdentification: string,
    password: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      conditions: {
        userName: userIdentification,
      },
    });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        user.password = undefined;
        return user;
      }
    }

    throw new UnauthorizedError(
      'Username or Email address or password provided is incorrect.',
    );
  }
}
