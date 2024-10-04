import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Product } from './product.entity';

enum ProductOptionType {
  FREE_VALUES = 'free_values',
  FIXED_VALUES = 'fixed_values',
}

@Entity()
export class ProductOption extends DefaultEntity {
  @ManyToOne(() => Product, (product) => product.productOptions)
  product: Product;

  @Column({
    type: 'enum',
    enum: ProductOptionType,
  })
  type: ProductOptionType;

  @Column()
  required: boolean;
}
