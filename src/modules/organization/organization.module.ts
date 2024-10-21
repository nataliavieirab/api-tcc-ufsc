import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { UserService } from 'src/services/domains/user.service';
import { StoresController } from './store/stores.controller';
import { StoreService } from 'src/services/domains/store.service';
import { UserRepository } from 'src/repositories/user.repository';
import { StoreRepository } from 'src/repositories/store.repository';

@Module({
  controllers: [UsersController, StoresController],
  providers: [UserService, StoreService, UserRepository, StoreRepository],
})
export class OrganizationModule {}
