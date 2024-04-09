import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { FranchiseController } from './modules/admin/franchise/franchise.controller';
import { AdminModule } from './modules/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './repositories/user-repository';
import { PrismaUsersRepository } from './repositories/prisma/prisma-user-repository';
import { FranchiseRepository } from './repositories/franchise-repository';
import { PrismaFranchiseRepository } from './repositories/prisma/prisma-franchise-repository';

@Module({
  imports: [AdminModule, PrismaModule, AuthModule, JwtModule],
  controllers: [AppController, FranchiseController],
  providers: [
    PrismaService,
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
