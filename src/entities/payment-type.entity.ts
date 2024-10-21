import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Store } from './store.entity';
import { Payment } from './payment.entity';

export enum SystemPaymentType {
  CASH = 'cash',
  CREDIT = 'credit',
  DEBIT = 'debit',
  PIX = 'pix',
  TRANSFER = 'transfer',
}

@Entity()
export class PaymentType extends DefaultEntity {
  @ManyToOne(() => Store, (store) => store.paymentTypes)
  store: Store;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: SystemPaymentType,
  })
  type: SystemPaymentType;

  @OneToMany(() => Payment, (payment) => payment.paymentType)
  payments: Payment[];
}
