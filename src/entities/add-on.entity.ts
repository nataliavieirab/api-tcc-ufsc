import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Company } from './company.entity';

@Entity()
export class AddOn extends DefaultEntity {
  @ManyToOne(() => Company, (company) => company.addOns)
  company: Company;

  @Column()
  name: string;
}
