import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { ProductOption } from './product-option.entity';

@Entity()
export class ProductOptionValue extends DefaultEntity {
  @ManyToOne(() => ProductOption, (product) => product.values)
  option: ProductOption;

  @Column()
  name: string;

  @Column()
  value: string;
}
