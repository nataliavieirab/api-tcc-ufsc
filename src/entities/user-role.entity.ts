import { Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import { DefaultEntity } from './default-entity';

@Entity()
export class UserRole extends DefaultEntity {
  @ManyToOne(() => User, (user) => user.roles)
  user: User;

  @ManyToOne(() => Role, (role) => role.name)
  role: Role;
}
