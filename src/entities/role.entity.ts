import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { UserRole } from './user-role.entity';
import { RolePermission } from './role-permission.entity';
import { Company } from './company.entity';

@Entity()
export class Role extends DefaultEntity {
  @ManyToOne(() => Company, (company) => company.roles)
  company: Role;

  @Column()
  name: string;

  @OneToMany(() => UserRole, (user) => user.role)
  users: UserRole[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions: RolePermission[];
}
