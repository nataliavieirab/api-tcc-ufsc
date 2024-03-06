import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './repository/users-repository'; // Importe o repositório
import { PrismaUsersRepository } from './repository/prisma/prisma-users-repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    UsersService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ], // Adicione o repositório aos providers
})
export class UsersModule {}
