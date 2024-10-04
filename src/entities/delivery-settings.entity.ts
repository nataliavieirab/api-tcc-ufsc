import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Company } from './company.entity';

enum DeliveryStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}
@Entity()
export class DeliverySettings extends DefaultEntity {
  @OneToOne(() => Company, (company) => company.deliverySettings)
  @JoinColumn()
  company: Company;

  @Column()
  start_hour: string;

  @Column()
  end_hour: string;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
  })
  type: DeliveryStatus;
}
