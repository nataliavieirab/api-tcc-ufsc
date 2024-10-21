import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Store } from './store.entity';
import { ProductAddOn } from './product-add-on.entity';

@Entity()
export class AddOn extends DefaultEntity {
  @ManyToOne(() => Store, (store) => store.addOns)
  store: Store;

  @Column()
  name: string;

  @OneToMany(() => ProductAddOn, (productAdd) => productAdd.addOn)
  productAddOns: ProductAddOn[];
}
