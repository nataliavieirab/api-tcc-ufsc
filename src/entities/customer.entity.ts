import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default-entity';

@Entity()
export class Customer extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
