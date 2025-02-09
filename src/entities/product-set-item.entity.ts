import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { ProductSet } from './product-set.entity';
import { Product } from './product.entity';

@Entity()
export class ProductSetItem extends DefaultEntity {
  @ManyToOne(() => ProductSet, (productSet) => productSet.items)
  productSet: ProductSet;

  @ManyToOne(() => Product, (productSet) => productSet.setItems)
  product: Product;

  @Column({ type: 'float' })
  price: number;
}
