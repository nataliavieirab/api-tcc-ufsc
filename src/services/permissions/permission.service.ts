import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { actions, roles_permissions, module_permissions } from './permissions';

@Injectable()
export class PermissionService {
  user_roles: string[];

  constructor(user: User) {
    this.user_roles = user.roles;
  }

  validateAction(action: actions): boolean {
    const permitted_roles = roles_permissions[action];

    const hasPermittedRoles = this.user_roles.some((role) => {
      permitted_roles.includes(role);
    });

    return hasPermittedRoles;
  }

  validateModuleAccess(module: string): boolean {
    const permitted_roles = module_permissions[module];

    const hasPermittedRoles = this.user_roles.some((role) => {
      permitted_roles.includes(role);
    });

    return hasPermittedRoles;
  }
}
