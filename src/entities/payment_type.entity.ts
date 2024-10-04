import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Company } from './company.entity';

enum SystemPaymentType {
  CASH = 'cash',
  CREDIT = 'credit',
  DEBIT = 'debit',
  PIX = 'pix',
  TRANSFER = 'transfer',
}

@Entity()
export class PaymentType extends DefaultEntity {
  @ManyToOne(() => Company, (company) => company.paymentTypes)
  company: Company;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: SystemPaymentType,
  })
  type: SystemPaymentType;
}
