import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './repositories/user-repository';
import { PrismaUsersRepository } from './repositories/prisma/prisma-user-repository';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth-.guard';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    OrganizationModule,
    PrismaModule,
    AuthModule,
    JwtModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
