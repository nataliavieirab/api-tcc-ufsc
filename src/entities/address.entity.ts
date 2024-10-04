import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default-entity';

@Entity()
export class Address extends DefaultEntity {
  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  complement: string;

  @Column()
  zipCode: number;
}
