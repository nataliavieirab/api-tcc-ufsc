import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { DeliveryNeighborhood } from './delivery-neighborhood.entity';

@Entity()
export class Neighborhood extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  code: number;

  @OneToMany(
    () => DeliveryNeighborhood,
    (deliveryNeighborhood) => deliveryNeighborhood.neighborhood,
  )
  deliveryNeighborhood: DeliveryNeighborhood[];
}
