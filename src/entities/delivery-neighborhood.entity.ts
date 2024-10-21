import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Neighborhood } from './neighborhood.entity';
import { DeliverySettings } from './delivery-settings.entity';

@Entity()
export class DeliveryNeighborhood extends DefaultEntity {
  @ManyToOne(() => DeliverySettings)
  deliverySettings: DeliverySettings;

  @ManyToOne(
    () => Neighborhood,
    (neighborhood) => neighborhood.deliveryNeighborhood,
  )
  neighborhood: Neighborhood;

  @Column()
  deliveryFee: number;
}
