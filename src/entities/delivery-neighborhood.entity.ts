import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { DeliverySettings } from './delivery-settings.entity';

@Entity()
export class DeliveryNeighborhood extends DefaultEntity {
  @ManyToOne(() => DeliverySettings)
  deliverySettings: DeliverySettings;

  @Column()
  neighborhoodCode: string;

  @Column()
  neighborhoodName: string;

  @Column()
  deliveryFee: number;
}
