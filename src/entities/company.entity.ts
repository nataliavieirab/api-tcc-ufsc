import { Column, Entity, OneToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { CompanyAddress } from './company-address.entity';

@Entity()
export class Company extends DefaultEntity {
  @Column()
  name: string;

  @OneToOne(() => CompanyAddress, (address) => address.company)
  address?: CompanyAddress;
}
