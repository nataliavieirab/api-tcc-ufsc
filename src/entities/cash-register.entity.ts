import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Store } from './store.entity';
import { Order } from './order.entity';
import { User } from './user.entity';

@Entity()
export class CashRegister extends DefaultEntity {
  @ManyToOne(() => Store, (store) => store.cashRegisters)
  store: Store;

  @ManyToOne(() => User)
  responsibleUser: User;

  @Column({ nullable: true })
  openingDate: Date;

  @Column({ nullable: true })
  closingDate: Date;

  @OneToMany(() => Order, (order) => order.cashRegister)
  orders: Order[];
}
