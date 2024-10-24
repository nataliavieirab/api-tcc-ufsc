import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { BagItem } from './bag-item.entity';
import { ProductAddOn } from './product-add-on.entity';

@Entity()
export class BagItemAddOn extends DefaultEntity {
  @ManyToOne(() => BagItem, (bagItem) => bagItem.bagItemAddOns)
  bagItem: BagItem;

  @ManyToOne(() => ProductAddOn, { lazy: true })
  productAddOn: ProductAddOn;

  @Column()
  quantity: number;
}
