import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { BagItem } from './bag-item.entity';
import { ProductOption } from './product-option.entity';
import { ProductOptionValue } from './product-option-value.entity';

@Entity()
export class BagItemOption extends DefaultEntity {
  @ManyToOne(() => BagItem, (bag) => bag.bagItemOptions)
  bagItem: BagItem;

  @ManyToOne(() => ProductOption)
  productOption: ProductOption;

  @ManyToOne(() => ProductOptionValue, { nullable: true, lazy: true })
  optionValue?: ProductOptionValue;

  @Column({ nullable: true })
  value?: string;
}
