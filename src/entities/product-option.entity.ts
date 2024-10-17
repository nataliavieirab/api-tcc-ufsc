import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Product } from './product.entity';
import { ProductOptionValue } from './product-option-value.entity';

export enum ProductOptionType {
  FREE_VALUES = 'free_values',
  FIXED_VALUES = 'fixed_values',
}

@Entity()
export class ProductOption extends DefaultEntity {
  @ManyToOne(() => Product, (product) => product.productOptions)
  product: Product;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ProductOptionType,
  })
  type: ProductOptionType;

  @Column()
  required: boolean;

  @OneToMany(() => ProductOptionValue, (value) => value.option)
  values: ProductOptionValue[];
}
