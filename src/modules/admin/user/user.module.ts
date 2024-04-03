import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './service/user.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
