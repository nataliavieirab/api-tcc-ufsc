import { DefaultRepository } from './default.repository';
import { UserRole } from 'src/entities/user-role.entity';

export class UserRoleRepository extends DefaultRepository<UserRole> {
  constructor() {
    super(UserRole);
  }
}
