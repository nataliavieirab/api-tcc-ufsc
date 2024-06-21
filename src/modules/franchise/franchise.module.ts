import { Module } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-user-repository';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { UsersController } from './user/users.controller';
import { BranchController } from './branch/branch.controller';
import { BranchRepository } from 'src/repositories/branch-repository';
import { PrismaBranchRepository } from 'src/repositories/prisma/prisma-branch-repository';
import { UserService } from 'src/services/domains/user.service';
import { BranchService } from 'src/services/domains/branch.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController, BranchController],
  providers: [
    PrismaService,
    UserService,
    BranchService,
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: BranchRepository,
      useClass: PrismaBranchRepository,
    },
  ],
})
export class FranchiseModule {}
