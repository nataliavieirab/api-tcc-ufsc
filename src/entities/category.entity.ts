import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Company } from './company.entity';
import { ProductCategory } from './product-category.entity';

@Entity()
export class Category extends DefaultEntity {
  @ManyToOne(() => Company, (company) => company.categories)
  company: Company;

  @Column()
  name: string;

  @OneToMany(() => ProductCategory, (productSetItem) => productSetItem.product)
  productCategories: ProductCategory[];
}
