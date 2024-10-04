import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Bag } from './bag.entity';
import { Shipping } from './shipping.entity';
import { Product } from './product.entity';
import { BagItemOption } from './bag-item-option.entity';

@Entity()
export class BagItem extends DefaultEntity {
  @ManyToOne(() => Bag, (bag) => bag.items)
  bag: Bag;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Bag, (bag) => bag.items)
  shipping: Shipping;

  @Column()
  quantity: number;

  @Column()
  unitPrice: number;

  @OneToMany(() => BagItemOption, (bag) => bag.bagItem)
  bagItemOptions: BagItemOption;
}
