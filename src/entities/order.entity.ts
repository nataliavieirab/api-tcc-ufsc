import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Bag } from './bag.entity';
import { CashRegister } from './cash-register.entity';
import { Payment } from './payment.entity';

@Entity()
export class Order extends DefaultEntity {
  @OneToOne(() => Bag, (bag) => bag.order)
  @JoinColumn()
  bag: Bag;

  @ManyToOne(() => CashRegister, (cashRegister) => cashRegister.orders)
  cashRegister: CashRegister;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
