import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default-entity';

@Entity()
export class Address extends DefaultEntity {
  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  zipCode: string;

  @Column()
  neighborhoodCode: string;
}
