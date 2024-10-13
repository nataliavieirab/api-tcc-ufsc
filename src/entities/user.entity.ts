import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { UserRole } from './user-role.entity';

@Entity()
export class User extends DefaultEntity {
  @Column()
  @Unique('userName', [])
  userName: string;

  @OneToMany(() => UserRole, (role) => role.user)
  userRoles: UserRole[];

  @Column()
  password: string;
}
