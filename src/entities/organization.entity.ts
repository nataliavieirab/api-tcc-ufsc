import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default-entity';

@Entity()
export class Organization extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  email: string;
}
