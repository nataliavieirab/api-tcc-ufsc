import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { OrganizationsController } from './organization/organizations.controller';
import { UserService } from 'src/services/domains/user.service';
import { UserRepository } from 'src/repositories/user.repository';
import { UserRoleRepository } from 'src/repositories/user-role.repository';
import { RoleRepository } from 'src/repositories/role.repository';
import { OrganizationService } from 'src/services/domains/organization.service';
import { OrganizationRepository } from 'src/repositories/organization.repository';
import { TenantService } from 'src/services/application/tenant.service';
import { CurrentRequestService } from 'src/services/application/current-request.service';
import { postgresDataSource } from 'src/infra/data-source';

@Module({
  controllers: [UsersController, OrganizationsController],
  providers: [
    UserService,
    UserRepository,
    UserRoleRepository,
    RoleRepository,
    OrganizationService,
    OrganizationRepository,
    TenantService,
    CurrentRequestService,
    {
      provide: 'DataSource',
      useValue: postgresDataSource,
    },
  ],
})
export class AdminModule {}
