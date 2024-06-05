import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { actions, roles_permissions } from './permissions';

@Injectable()
export class PermissionService {
  validateAccess(user: User, action: actions): boolean {
    const user_roles = user.roles;
    const permitted_roles = roles_permissions[action];

    const hasPermittedRoles = user_roles.some(function (role) {
      return permitted_roles.includes(role);
    });

    return hasPermittedRoles;
  }
}
