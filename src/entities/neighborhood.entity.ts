import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { City } from './city.entity';

@Entity()
export class Neighborhood extends DefaultEntity {
  @ManyToOne(() => City, (city) => city.nei)
  city: City;

  @Column()
  name: string;

  @Column()
  code: number;
}
