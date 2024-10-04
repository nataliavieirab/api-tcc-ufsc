import { Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Product } from './product.entity';
import { AddOn } from './add-on.entity';

@Entity()
export class ProductAddOn extends DefaultEntity {
  @ManyToOne(() => Product, (product) => product.productAddOns)
  product: Product;

  @ManyToOne(() => AddOn, (addOn) => addOn.productAddOns)
  addOn: AddOn;
}
