import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { EntityDefaultService } from './entity-default.service';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRoleRepository } from 'src/repositories/user-role.repository';
import { SystemRoles } from 'src/services/permissions/permissions';
import { RoleRepository } from 'src/repositories/role.repository';

@Injectable()
export class UserService extends EntityDefaultService<User> {
  constructor(
    userRepository: UserRepository,
    private readonly userRoleRepository: UserRoleRepository,
    private readonly roleRepository: RoleRepository,
  ) {
    super(userRepository);
  }

  async create(input: {
    storeId?: string;
    userName: string;
    password: string;
    roles?: string[];
    systemRoles?: SystemRoles[];
  }): Promise<User> {
    input.password = await bcrypt.hash(input.password, 10);

    const createdUser = await this.repository.create({
      userName: input.userName,
      password: input.password,
      storeId: input.storeId,
    });

    for (const role of input.systemRoles || []) {
      await this.addRole(createdUser, role);
    }

    for (const role of input.roles || []) {
      await this.addRole(createdUser, null, role);
    }

    return createdUser;
  }

  async update(
    id: string,
    input: {
      userName?: string;
      password?: string;
    },
  ): Promise<User> {
    if (input.password) input.password = await bcrypt.hash(input.password, 10);

    const updatedUser = await this.repository.update(id, input);

    return updatedUser;
  }

  async addRole(user: User, systemRole: SystemRoles, roleId?: string) {
    const role = roleId ? await this.roleRepository.find(roleId) : null;

    this.userRoleRepository.create({
      user: user,
      systemRole,
      role,
    });
  }
}
