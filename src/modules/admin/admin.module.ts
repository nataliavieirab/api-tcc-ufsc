import { Module } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository';
import { UsersController } from './user/users.controller';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-user-repository';
import { PrismaFranchiseRepository } from 'src/repositories/prisma/prisma-franchise-repository';
import { FranchiseRepository } from 'src/repositories/franchise-repository';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
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
  exports: [UserRepository],
})
export class AdminModule {}
