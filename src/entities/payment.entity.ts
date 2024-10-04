import { Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { PaymentType } from './payment-type.entity';
import { Order } from './order.entity';

@Entity()
export class Payment extends DefaultEntity {
  @ManyToOne(() => PaymentType, (paymentType) => paymentType.payments)
  paymentType: PaymentType;

  @ManyToOne(() => Order, (order) => order.payments)
  order: Order;
}
