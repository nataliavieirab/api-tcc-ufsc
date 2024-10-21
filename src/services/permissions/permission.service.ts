import { Injectable } from '@nestjs/common';
import { CurrentRequestService } from '../application/current-request.service';
import { DependenciesResolver } from 'src/utils/dependencies-resolver';
import { RolePermissionRepository } from 'src/repositories/role-permission.repository';
import { RoleRepository } from 'src/repositories/role.repository';
import { UserRoleRepository } from 'src/repositories/user-role.repository';
import { systemRolesPermissions } from './permissions';

@Injectable()
export class PermissionService {
  currentRequestService: CurrentRequestService;
  rolePermissionRepository: RolePermissionRepository;
  roleRepository: RoleRepository;
  userRoleRepository: UserRoleRepository;

  constructor() {
    this.currentRequestService = DependenciesResolver.getResolvedDependency(
      'CurrentRequestService',
    );

    this.rolePermissionRepository = DependenciesResolver.getResolvedDependency(
      'RolePermissionRepository',
    );

    this.userRoleRepository =
      DependenciesResolver.getResolvedDependency('UserRoleRepository');

    this.roleRepository =
      DependenciesResolver.getResolvedDependency('RoleRepository');
  }

  async validateAction(action: string, module: string): Promise<boolean> {
    if (this.validateActionBySystemRole(action, module)) return true;

    const rolesPermissionsQuery = this.rolePermissionRepository.getQueryFor({
      conditions: {
        action,
        module,
      },
    });

    const rolesQuery = this.roleRepository.getQueryFor({
      joins: {
        rolePermissions: rolesPermissionsQuery,
      },
    });

    const currentUser = this.currentRequestService.getCurrentUser();

    const userRole = await this.userRoleRepository.findOne({
      conditions: {
        user: currentUser,
      },
      joins: {
        role: rolesQuery,
      },
    });

    return !!userRole;
  }

  async validateActionBySystemRole(
    action: string,
    module: string,
  ): Promise<boolean> {
    const currentUser = this.currentRequestService.getCurrentUser();

    const userSystemRoles = await this.userRoleRepository.getMany({
      conditions: {
        user: currentUser,
        role: null,
      },
    });

    const permittedSystemRoles = systemRolesPermissions[module][action];

    return userSystemRoles.some((userRole) =>
      permittedSystemRoles?.includes(userRole.systemRole),
    );
  }
}
