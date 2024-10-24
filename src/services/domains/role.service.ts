import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/repositories/role.repository';
import { EntityDefaultService } from './entity-default.service';
import { Role } from 'src/entities/role.entity';
import { RolePermissionRepository } from 'src/repositories/role-permission.repository';
import { getSystemRolePermissions, Modules } from '../permissions/permissions';
import { StoreRepository } from 'src/repositories/store.repository';
import { UserRepository } from 'src/repositories/user.repository';

interface CreateRoleInput {
  name: string;
  permissions: string[];
  module: Modules;
  storeId: string;
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
    private storeRepository: StoreRepository,
    private userRepository: UserRepository,
  ) {
    super(roleRepository);
  }

  async create(createInput: CreateRoleInput): Promise<Role> {
    const store = await this.storeRepository.find(createInput.storeId);

    const newRole = await this.repository.create({
      store,
      name: createInput.name,
    });

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

  async getUserRoles(userId: string): Promise<
    {
      role: {
        id: string | null;
        name: string;
      };
      permissions: string[];
    }[]
  > {
    const user = await this.userRepository.find(userId, {
      relations: [],
      nestedRelations: [
        {
          entity: 'userRoles',
          nestedEntity: 'role',
        },
        {
          entity: 'role',
          nestedEntity: 'rolePermissions',
        },
      ],
    });

    const roles = user.userRoles.map((ur) => {
      if (ur.role) {
        const role = ur.role;

        return {
          role: {
            id: role.id,
            name: role.name,
          },
          permissions: role.rolePermissions.map((rp) => rp.action),
        };
      } else {
        const systemRole = ur.systemRole;

        return {
          role: { id: null, name: systemRole },
          permissions: getSystemRolePermissions(systemRole),
        };
      }
    });

    return roles;
  }
}
