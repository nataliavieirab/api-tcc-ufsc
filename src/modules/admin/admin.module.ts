import { Module } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-user-repository';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { UsersController } from './user/users.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class AdminModule {}
