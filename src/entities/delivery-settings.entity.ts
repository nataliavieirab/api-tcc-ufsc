import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Store } from './store.entity';

export enum DeliveryStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}
@Entity()
export class DeliverySettings extends DefaultEntity {
  @OneToOne(() => Store, (store) => store.deliverySettings)
  @JoinColumn()
  store: Store;

  @Column({ nullable: true })
  startHour: Date;

  @Column({ nullable: true })
  endHour: Date;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    default: DeliveryStatus.OPEN,
  })
  status: DeliveryStatus;
}
