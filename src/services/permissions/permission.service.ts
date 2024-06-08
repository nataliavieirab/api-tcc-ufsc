import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { actions, roles_permissions, module_permissions } from './permissions';

@Injectable()
export class PermissionService {
  user_role: string;

  constructor(user: User) {
    this.user_role = user.role;
  }

  validateAction(action: actions): boolean {
    const permitted_roles = roles_permissions[action];

    return permitted_roles.includes(this.user_role);
  }

  validateModuleAccess(module: string): boolean {
    const permitted_roles = module_permissions[module];

    if (!permitted_roles) return false;

    return permitted_roles.includes(this.user_role);
  }
}
