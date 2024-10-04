import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { BagItem } from './bag-item.entity';
import { AddOn } from './add-on.entity';

@Entity()
export class BagItemAddOn extends DefaultEntity {
  @ManyToOne(() => BagItem, (bagItem) => bagItem.bagItemAddOns)
  bagItem: BagItem;

  @ManyToOne(() => AddOn)
  addOn: AddOn;

  @Column()
  quantity: number;
}
