import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { UserRole } from './user-role.entity';
import { RolePermission } from './role-permission.entity';

@Entity()
export class Role extends DefaultEntity {
  @OneToMany(() => UserRole, (user) => user.role)
  users: UserRole[];

  @OneToMany(() => RolePermission, (permission) => permission.role)
  permissions: RolePermission[];

  @Column()
  name: string;
}
