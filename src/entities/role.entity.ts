import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { UserRole } from './user-role.entity';
import { RolePermission } from './role-permission.entity';
import { Store } from './store.entity';

@Entity()
export class Role extends DefaultEntity {
  @ManyToOne(() => Store, (store) => store.roles)
  store: Role;

  @Column()
  name: string;

  @OneToMany(() => UserRole, (user) => user.role)
  users: UserRole[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions: RolePermission[];
}
