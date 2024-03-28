import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from '../../repositories/users-repository'; // Importe o repositório
import { PrismaService } from 'src/database/prisma.service';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import { FranchiseController } from './controllers/franchise.controller';
import { FranchiseRepository } from 'src/repositories/franchise-repository';
import { PrismaFranchiseRepository } from 'src/repositories/prisma/prisma-franchise-repository';

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
