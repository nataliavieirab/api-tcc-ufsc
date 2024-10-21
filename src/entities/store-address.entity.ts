import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Store } from './store.entity';
import { Address } from './address.entity';

@Entity()
export class StoreAddress extends DefaultEntity {
  @OneToOne(() => Store, (store) => store.address)
  @JoinColumn()
  store: Store;

  @ManyToOne(() => Address)
  address: Address;
}
