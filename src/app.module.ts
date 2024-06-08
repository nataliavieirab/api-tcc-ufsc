import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { FranchiseController } from './modules/organization/franchise/franchise.controller';
import { OrganizationModule } from './modules/organization/organization.module';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './repositories/user-repository';
import { PrismaUsersRepository } from './repositories/prisma/prisma-user-repository';
import { FranchiseRepository } from './repositories/franchise-repository';
import { PrismaFranchiseRepository } from './repositories/prisma/prisma-franchise-repository';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth-.guard';
import { UsersController } from './modules/organization/user/users.controller';

@Module({
  imports: [OrganizationModule, PrismaModule, AuthModule, JwtModule],
  controllers: [AppController, UsersController, FranchiseController],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: FranchiseRepository,
      useClass: PrismaFranchiseRepository,
    },
  ],
})
export class AppModule {}
