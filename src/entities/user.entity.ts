import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { UserRole } from './user-role.entity';
import { Store } from './store.entity';

@Entity()
export class User extends DefaultEntity {
  @ManyToOne(() => Store, { nullable: true })
  store?: Store;

  @Column()
  @Unique('userName', [])
  userName: string;

  @OneToMany(() => UserRole, (role) => role.user)
  userRoles: UserRole[];

  @Column()
  password: string;
}
