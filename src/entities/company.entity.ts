import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { CashRegister } from './cash-register.entity';
import { CompanyAddress } from './company-address.entity';
import { PaymentType } from './payment_type.entity';

@Entity()
export class Company extends DefaultEntity {
  @Column()
  name: string;

  @OneToMany(() => CashRegister, (cashRegister) => cashRegister.company)
  cashRegister: CashRegister[];

  @OneToOne(() => CompanyAddress, (address) => address.company)
  address?: CompanyAddress;
}
