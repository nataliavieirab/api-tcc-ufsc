import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/repositories/role.repository';
import { EntityDefaultService } from './entity-default.service';
import { Role } from 'src/entities/role.entity';
import { RolePermissionRepository } from 'src/repositories/role-permission.repository';
import { Modules } from '../permissions/permissions';

interface CreateRoleInput {
  name: string;
  permissions: string[];
  module: Modules;
}

interface UpdateRoleInput {
  name: string;
  permissions: string[];
  module: Modules;
}
@Injectable()
export class RoleService extends EntityDefaultService<Role> {
  constructor(
    roleRepository: RoleRepository,
    private rolePermissionRepository: RolePermissionRepository,
  ) {
    super(roleRepository);
  }

  async create(createInput: CreateRoleInput): Promise<Role> {
    const newRole = await this.repository.create(createInput);

    for (const permission of createInput.permissions) {
      await this.rolePermissionRepository.create({
        role: newRole,
        action: permission,
        module: createInput.module,
      });
    }

    return newRole;
  }

  async update(id: string, createInput: UpdateRoleInput): Promise<Role> {
    const updatedRole = await this.repository.update(id, {
      name: createInput.name,
    });

    const rolePermissions = await this.rolePermissionRepository.getMany({
      conditions: { role: updatedRole },
    });

    for (const permission of createInput.permissions) {
      const rolePermission = rolePermissions.find(
        (rp) => rp.action === permission,
      );

      if (!rolePermission) {
        await this.rolePermissionRepository.create({
          role: updatedRole,
          action: permission,
          module: createInput.module,
        });
      }
    }

    for (const permission of rolePermissions) {
      const rolePermission = createInput.permissions.find(
        (rp) => rp === permission.action,
      );

      if (!rolePermission) {
        await this.rolePermissionRepository.delete(permission.id);
      }
    }

    return updatedRole;
  }
}
