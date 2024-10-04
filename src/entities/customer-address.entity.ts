import { Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Customer } from './customer.entity';
import { Address } from './address.entity';

@Entity()
export class CustomerAddress extends DefaultEntity {
  @ManyToOne(() => Customer, (customer) => customer.customerAddresses)
  customer: Customer;

  @ManyToOne(() => Address)
  address: Address;
}
