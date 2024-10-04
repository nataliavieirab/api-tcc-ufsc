import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { OrganizationController } from './organization/organization.controller';
import { UserService } from 'src/services/domains/user.service';

@Module({
  controllers: [UsersController, OrganizationController],
  providers: [UserService],
})
export class AdminModule {}
