import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Store } from './store.entity';
import { ProductSetItem } from './product-set-item.entity';
import { ProductCategory } from './product-category.entity';
import { ProductAddOn } from './product-add-on.entity';
import { ProductOption } from './product-option.entity';

@Entity()
export class Product extends DefaultEntity {
  @ManyToOne(() => Store, (store) => store.products)
  store: Store;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'float' })
  defaultPrice: number;

  @OneToMany(() => ProductSetItem, (productSetItem) => productSetItem.product)
  setItems: ProductSetItem[];

  @OneToMany(() => ProductCategory, (productSetItem) => productSetItem.product)
  productCategories: ProductCategory[];

  @OneToMany(() => ProductAddOn, (productSetItem) => productSetItem.product)
  productAddOns: ProductAddOn[];

  @OneToMany(() => ProductOption, (productSetItem) => productSetItem.product)
  productOptions: ProductOption[];
}
