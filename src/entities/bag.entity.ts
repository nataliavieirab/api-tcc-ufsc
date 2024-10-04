import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { AddOn } from './add-on.entity';
import { Customer } from './customer.entity';
import { Order } from './order.entity';
import { BagItem } from './bag-item.entity';

enum BagStatus {
  OPENED = 'opened',
  ORDERED = 'ordered',
}

@Entity()
export class Bag extends DefaultEntity {
  @ManyToOne(() => Customer, (customer) => customer.bags)
  customer: Customer;

  @ManyToOne(() => AddOn, (addOn) => addOn.productAddOns)
  addOn: AddOn;

  @Column({ type: 'enum', enum: BagStatus })
  status: BagStatus;

  @OneToOne(() => Order, (order) => order.bag)
  order: Order;

  @OneToMany(() => BagItem, (item) => item.bag)
  items: BagItem[];
}
