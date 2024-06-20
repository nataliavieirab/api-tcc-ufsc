import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user-repository';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from '../../modules/auth/errors/unauthorized.error';
import { UserPayload } from 'src/modules/auth/models/UserPayload';
import { UserToken } from 'src/modules/auth/models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      username: user.user_name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    userIdentification: string,
    password: string,
  ): Promise<User> {
    let user = await this.userRepository.findByEmail(userIdentification);

    if (!user) {
      user = await this.userRepository.findByUserName(userIdentification);
    }

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Username or Email address or password provided is incorrect.',
    );
  }
}
