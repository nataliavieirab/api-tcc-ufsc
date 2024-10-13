import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from 'src/repositories/organization.repository';
import { EntityDefaultService } from './entity-default.service';
import { Organization } from 'src/entities/organization.entity';
import { UserService } from './user.service';
import { TenantService } from '../application/tenant.service';
import { SystemRole } from 'src/entities/user-role.entity';

@Injectable()
export class OrganizationService extends EntityDefaultService<Organization> {
  constructor(
    organizationRepository: OrganizationRepository,
    private readonly userService: UserService,
    private readonly tenantService: TenantService,
  ) {
    super(organizationRepository);
  }

  async create(input: {
    name: string;
    email: string;
    userName: string;
    userPassword: string;
  }): Promise<Organization> {
    const createdOrganization = await this.repository.create({
      name: input.name,
      email: input.email,
    });

    await this.tenantService.createTenant(createdOrganization.id);

    await this.userService.create({
      userName: input.userName,
      password: input.userPassword,
      systemRoles: [SystemRole.ORGANIZATION_ADMIN],
    });

    return createdOrganization;
  }
}
