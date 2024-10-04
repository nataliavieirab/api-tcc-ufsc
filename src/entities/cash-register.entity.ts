import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Company } from './company.entity';

@Entity()
export class CashRegister extends DefaultEntity {
  @ManyToOne(() => Company, (company) => company.cashRegister)
  company: Company;

  @Column()
  opening_date: Date;

  @Column()
  closing_date: Date;
}
