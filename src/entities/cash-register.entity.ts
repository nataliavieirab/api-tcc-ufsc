import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Company } from './company.entity';
import { Order } from './order.entity';

@Entity()
export class CashRegister extends DefaultEntity {
  @ManyToOne(() => Company, (company) => company.cashRegisters)
  company: Company;

  @Column()
  opening_date: Date;

  @Column()
  closing_date: Date;

  @OneToMany(() => Order, (order) => order.cashRegister)
  orders: Order[];
}
