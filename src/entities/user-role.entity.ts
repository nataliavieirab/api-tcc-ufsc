import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import { DefaultEntity } from './default-entity';

export enum SystemRole {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  SYSTEM_ASSISTANT = 'SYSTEM_ASSISTANT',
  ORGANIZATION_ADMIN = 'ORGANIZATION_ADMIN',
  ORGANIZATION_ASSISTANT = 'ORGANIZATION_ASSISTANT',
}
@Entity()
export class UserRole extends DefaultEntity {
  @ManyToOne(() => User, (user) => user.userRoles)
  user: User;

  @ManyToOne(() => Role, (role) => role.name, { nullable: true })
  role: Role;

  @Column({ type: 'enum', enum: SystemRole, nullable: true })
  systemRole: SystemRole;
}
