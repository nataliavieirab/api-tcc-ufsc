import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { OrganizationsController } from './organization/organizations.controller';
import { UserService } from 'src/services/domains/user.service';
import { UserRepository } from 'src/repositories/user.repository';
import { UserRoleRepository } from 'src/repositories/user-role.repository';
import { RoleRepository } from 'src/repositories/role.repository';
import { OrganizationService } from 'src/services/domains/organization.service';
import { OrganizationRepository } from 'src/repositories/organization.repository';
import { postgresDataSource } from 'src/infra/data-source';
import { ApplicationModule } from 'src/services/application/application.module';
import { DataSource } from 'typeorm';
import { StoreRepository } from 'src/repositories/store.repository';

@Module({
  controllers: [UsersController, OrganizationsController],
  imports: [ApplicationModule],
  providers: [
    UserService,
    UserRepository,
    UserRoleRepository,
    RoleRepository,
    OrganizationService,
    OrganizationRepository,
    StoreRepository,
    {
      provide: DataSource,
      useValue: postgresDataSource,
    },
  ],
})
export class AdminModule {}
