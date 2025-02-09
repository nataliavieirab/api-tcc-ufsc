import { DefaultRepository } from './default.repository';
import { Role } from 'src/entities/role.entity';

export class RoleRepository extends DefaultRepository<Role> {
  constructor() {
    super(Role);
  }

  accessibilityQuery(store) {
    return { store };
  }
}
