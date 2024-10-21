import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Store } from './store.entity';
import { ProductSetItem } from './product-set-item.entity';

enum ProductSetStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class ProductSet extends DefaultEntity {
  @ManyToOne(() => Store, (store) => store.paymentTypes)
  store: Store;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ProductSetStatus,
  })
  status: ProductSetStatus;

  @OneToMany(
    () => ProductSetItem,
    (productSetItem) => productSetItem.productSet,
  )
  items: ProductSetItem[];
}
