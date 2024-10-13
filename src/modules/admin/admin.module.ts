import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { OrganizationsController } from './organization/organizations.controller';
import { UserService } from 'src/services/domains/user.service';

@Module({
  controllers: [UsersController, OrganizationsController],
  providers: [UserService],
})
export class AdminModule {}
