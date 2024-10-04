import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Company } from './company.entity';

@Entity()
export class Product extends DefaultEntity {
  @ManyToOne(() => Company, (company) => company.paymentTypes)
  company: Company;

  @Column()
  name: string;
}
