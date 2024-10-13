import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/repositories/role.repository';
import { EntityDefaultService } from './entity-default.service';
import { Role } from 'src/entities/role.entity';

@Injectable()
export class RoleService extends EntityDefaultService<Role> {
  constructor(roleRepository: RoleRepository) {
    super(roleRepository);
  }
}
