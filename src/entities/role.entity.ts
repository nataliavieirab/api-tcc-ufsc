import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { UserRole } from './user-role.entity';

@Entity()
export class Role extends DefaultEntity {
  @OneToMany(() => UserRole, (user) => user.role)
  @Column()
  name: string;
}
