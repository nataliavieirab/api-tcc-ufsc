import { UserRole } from 'src/entities/user-role.entity';

export class CreateUserBody {
  userName: string;

  userRoles: UserRole[];

  password: string;
}
