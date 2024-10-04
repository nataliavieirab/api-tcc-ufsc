import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Company } from './company.entity';

@Entity()
export class Category extends DefaultEntity {
  @ManyToOne(() => Company, (company) => company.categories)
  company: Company;

  @Column()
  name: string;
}
