import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Bag } from './bag.entity';
import { Shipping } from './shipping.entity';
import { Product } from './product.entity';
import { BagItemOption } from './bag-item-option.entity';
import { BagItemAddOn } from './bag-item-add-on.entity';

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

  @Column({ type: 'float' })
  unitPrice: number;

  @OneToMany(() => BagItemOption, (bag) => bag.bagItem)
  bagItemOptions: BagItemOption[];

  @OneToMany(() => BagItemAddOn, (bag) => bag.bagItem)
  bagItemAddOns: BagItemAddOn[];

  async getTotal(): Promise<number> {
    let itemTotal = this.unitPrice;

    for (const option of await this.bagItemOptions) {
      const optionValue = await option.optionValue;

      itemTotal += optionValue?.price || 0;
    }

    for (const itemAddOn of await this.bagItemAddOns) {
      const productAddOn = await itemAddOn.productAddOn;

      itemTotal += productAddOn.price * itemAddOn.quantity;
    }

    return itemTotal * this.quantity;
  }
}
