import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Company } from './company.entity';
import { ProductSetItem } from './product-set-item.entity';

@Entity()
export class Product extends DefaultEntity {
  @ManyToOne(() => Company, (company) => company.products)
  company: Company;

  @Column()
  name: string;

  @OneToMany(() => ProductSetItem, (productSetItem) => productSetItem.product)
  setItems: ProductSetItem[];

  @Column()
  defaultPrice: number;
}
