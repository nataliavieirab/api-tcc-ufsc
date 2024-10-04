import { Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Neighborhood } from './neighborhood.entity';

@Entity()
export class DeliveryNeighborhood extends DefaultEntity {
  @ManyToOne(
    () => Neighborhood,
    (neighborhood) => neighborhood.deliveryNeighborhood,
  )
  neighborhood: Neighborhood;
}
