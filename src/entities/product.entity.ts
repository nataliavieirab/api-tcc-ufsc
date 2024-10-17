import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Company } from './company.entity';
import { ProductSetItem } from './product-set-item.entity';
import { ProductCategory } from './product-category.entity';
import { ProductAddOn } from './product-add-on.entity';
import { ProductOption } from './product-option.entity';

@Entity()
export class Product extends DefaultEntity {
  @ManyToOne(() => Company, (company) => company.products)
  company: Company;

  @Column()
  name: string;

  @Column()
  defaultPrice: number;

  @OneToMany(() => ProductSetItem, (productSetItem) => productSetItem.product)
  setItems: ProductSetItem[];

  @OneToMany(() => ProductCategory, (productSetItem) => productSetItem.product)
  productCategories: ProductCategory[];

  @OneToMany(() => ProductAddOn, (productSetItem) => productSetItem.product)
  productAddOns: ProductAddOn[];

  @OneToMany(() => ProductOption, (productSetItem) => productSetItem.product)
  productOptions: ProductOption[];
}
