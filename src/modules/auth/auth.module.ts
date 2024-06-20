import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/services/domains/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRepository } from 'src/repositories/user-repository';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-user-repository';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class AuthModule {}
