import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { UserService } from 'src/services/domains/user.service';
import { FranchiseService } from 'src/services/domains/franchise.service';

@Module({
  controllers: [UsersController],
  providers: [UserService, FranchiseService],
})
export class OrganizationModule {}
