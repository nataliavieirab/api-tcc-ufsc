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

export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED',
  FINISHED = 'FINISHED',
}
@Entity()
export class Order extends DefaultEntity {
  @OneToOne(() => Bag, (bag) => bag.order)
  @JoinColumn()
  bag: Bag;

  @ManyToOne(() => CashRegister, (cashRegister) => cashRegister.orders)
  cashRegister: CashRegister;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @Column()
  date: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;
}
