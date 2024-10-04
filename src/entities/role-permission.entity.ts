import { Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Role } from './role.entity';

@Entity()
export class RolePermission extends DefaultEntity {
  @ManyToOne(() => Role, (role) => role.permissions)
  role: Role;
}
