import { config } from 'dotenv';
config();

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/services/domains/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRepository } from 'src/repositories/user.repository';
import { CustomerRepository } from 'src/repositories/customer.repository';
import { UserService } from 'src/services/domains/user.service';
import { UserRoleRepository } from 'src/repositories/user-role.repository';
import { RoleRepository } from 'src/repositories/role.repository';
import { postgresDataSource } from 'src/infra/data-source';
import { PassportModule } from '@nestjs/passport';
import { ApplicationModule } from 'src/services/application/application.module';
import { DataSource } from 'typeorm';
import { StoreRepository } from 'src/repositories/store.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15d' },
    }),
    PassportModule,
    ApplicationModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserRepository,
    CustomerRepository,
    JwtService,
    UserService,
    UserRoleRepository,
    StoreRepository,
    RoleRepository,
    {
      provide: DataSource,
      useValue: postgresDataSource,
    },
  ],
})
export class AuthModule {}
