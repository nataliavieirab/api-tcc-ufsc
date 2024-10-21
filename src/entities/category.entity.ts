import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Store } from './store.entity';
import { ProductCategory } from './product-category.entity';

@Entity()
export class Category extends DefaultEntity {
  @ManyToOne(() => Store, (store) => store.categories)
  store: Store;

  @Column()
  name: string;

  @OneToMany(() => ProductCategory, (productSetItem) => productSetItem.product)
  productCategories: ProductCategory[];
}
