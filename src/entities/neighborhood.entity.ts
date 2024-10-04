import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { City } from './city.entity';
import { DeliveryNeighborhood } from './delivery-neighborhood.entity';

@Entity()
export class Neighborhood extends DefaultEntity {
  @ManyToOne(() => City, (city) => city.neighborhoods)
  city: City;

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
