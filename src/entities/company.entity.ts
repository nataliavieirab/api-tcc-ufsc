import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default-entity';

@Entity()
export class Company extends DefaultEntity {
  @Column()
  name: string;
}
