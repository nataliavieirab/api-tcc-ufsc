import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default-entity';

@Entity()
export class City extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  code: number;

  @Column()
  state: string;
}
