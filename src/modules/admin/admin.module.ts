import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { UsersRepository } from '../../repositories/user-repository'; // Importe o repositório
import { PrismaService } from 'src/database/prisma.service';
import { FranchiseController } from './franchise/franchise.controller';
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-user-repository';
import { FranchiseRepository } from '../../repositories/franchise-repository';
import { PrismaFranchiseRepository } from '../../repositories/prisma/prisma-franchise-repository';

@Module({
  controllers: [UsersController, FranchiseController],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: FranchiseRepository,
      useClass: PrismaFranchiseRepository,
    },
  ], // Adicione o repositório aos providers
})
export class AdminModule {}
