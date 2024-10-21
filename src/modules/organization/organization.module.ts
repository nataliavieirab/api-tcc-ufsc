import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { UserService } from 'src/services/domains/user.service';
import { StoresController } from './store/stores.controller';
import { StoreService } from 'src/services/domains/store.service';
import { UserRepository } from 'src/repositories/user.repository';
import { StoreRepository } from 'src/repositories/store.repository';
import { UserRoleRepository } from 'src/repositories/user-role.repository';
import { RoleRepository } from 'src/repositories/role.repository';
import { DeliverySettingsRepository } from 'src/repositories/delivery-settings.repository';
import { DeliveryNeighborhoodRepository } from 'src/repositories/delivery-neighborhood.repository';

@Module({
  controllers: [UsersController, StoresController],
  providers: [
    UserService,
    StoreService,
    UserRepository,
    StoreRepository,
    UserRoleRepository,
    RoleRepository,
    DeliverySettingsRepository,
    DeliveryNeighborhoodRepository,
  ],
})
export class OrganizationModule {}
