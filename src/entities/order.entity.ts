import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Bag } from './bag.entity';
import { CashRegister } from './cash-register.entity';
import { Payment } from './payment.entity';
import { PaymentType } from './payment-type.entity';
import { Shipping } from './shipping.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  SHIPPING = 'SHIPPING',
  REFUSED = 'REFUSED',
  FINISHED = 'FINISHED',
}
@Entity()
export class Order extends DefaultEntity {
  @OneToOne(() => Bag, (bag) => bag.order)
  @JoinColumn()
  bag: Bag;

  @ManyToOne(() => CashRegister, (cashRegister) => cashRegister.orders, {
    nullable: true,
  })
  cashRegister?: CashRegister;

  @ManyToOne(() => PaymentType, { nullable: true })
  preferredPaymentType?: PaymentType;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @OneToMany(() => Shipping, (shipping) => shipping.order)
  shippings: Shipping[];

  @Column()
  date: Date;

  @Column({ type: 'float' })
  bagPrice: number;

  @Column({ type: 'float' })
  shippingPrice: number;

  @Column({ type: 'float' })
  totalPrice: number;

  @Column({ nullable: true })
  observation?: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;
}
