import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Neighborhood } from './neighborhood.entity';

@Entity()
export class City extends DefaultEntity {
  @OneToMany(() => Neighborhood, (neighborhood) => neighborhood.city)
  neighborhoods: Neighborhood[];

  @Column()
  name: string;

  @Column()
  code: number;

  @Column()
  state: string;
}
