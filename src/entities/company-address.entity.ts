import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Company } from './company.entity';
import { Address } from './address.entity';

@Entity()
export class CompanyAddress extends DefaultEntity {
  @OneToOne(() => Company, (company) => company.address)
  @JoinColumn()
  company: Company;

  @ManyToOne(() => Address)
  address: Address;
}
