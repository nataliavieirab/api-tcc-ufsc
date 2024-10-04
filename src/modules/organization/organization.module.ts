import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { UserService } from 'src/services/domains/user.service';

@Module({
  controllers: [UsersController],
  providers: [UserService],
})
export class OrganizationModule {}
