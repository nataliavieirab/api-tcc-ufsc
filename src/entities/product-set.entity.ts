import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Company } from './company.entity';

enum ProductSetStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class ProductSet extends DefaultEntity {
  @ManyToOne(() => Company, (company) => company.paymentTypes)
  company: Company;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ProductSetStatus,
  })
  status: ProductSetStatus;
}
