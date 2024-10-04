import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Bag } from './bag.entity';

@Entity()
export class Customer extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Bag, (bag) => bag.customer)
  bags: Bag[];
}
