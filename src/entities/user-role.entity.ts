import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import { DefaultEntity } from './default-entity';
import { SystemRoles } from 'src/services/permissions/permissions';

@Entity()
export class UserRole extends DefaultEntity {
  @ManyToOne(() => User, (user) => user.userRoles)
  user: User;

  @ManyToOne(() => Role, (role) => role.name, { nullable: true })
  role: Role;

  @Column({ type: 'enum', enum: SystemRoles, nullable: true })
  systemRole: SystemRoles;
}
