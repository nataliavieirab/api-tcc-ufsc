import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Company } from './company.entity';
import { Order } from './order.entity';
import { User } from './user.entity';

@Entity()
export class CashRegister extends DefaultEntity {
  @ManyToOne(() => Company, (company) => company.cashRegisters)
  company: Company;

  @ManyToOne(() => User)
  responsibleUser: User;

  @Column()
  openingDate: Date;

  @Column()
  closingDate: Date;

  @OneToMany(() => Order, (order) => order.cashRegister)
  orders: Order[];
}
