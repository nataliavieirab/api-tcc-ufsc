import { Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Product } from './product.entity';
import { Category } from './category.entity';

@Entity()
export class ProductCategory extends DefaultEntity {
  @ManyToOne(() => Product, (productSet) => productSet.productCategories)
  product: Product;

  @ManyToOne(() => Category, (productSet) => productSet.productCategories)
  category: Category;
}
