import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Address } from './address.entity';
import { BagItem } from './bag-item.entity';
import { Order } from './order.entity';

export enum ShippingStatus {
  AWAITING = 'awaiting',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
}

@Entity()
export class Shipping extends DefaultEntity {
  @ManyToOne(() => Address, { nullable: true })
  order: Order;

  @ManyToOne(() => Address)
  recipientAddress: Address;

  @Column({ nullable: true })
  recipientName?: string;

  @Column({ type: 'enum', enum: ShippingStatus })
  status: ShippingStatus;

  @Column()
  price: number;

  @OneToMany(() => BagItem, (item) => item.shipping)
  items: BagItem[];
}
