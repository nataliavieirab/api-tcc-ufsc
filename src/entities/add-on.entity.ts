import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Company } from './company.entity';
import { ProductAddOn } from './product-add-on.entity';

@Entity()
export class AddOn extends DefaultEntity {
  @ManyToOne(() => Company, (company) => company.addOns)
  company: Company;

  @Column()
  name: string;

  @OneToMany(() => ProductAddOn, (productAdd) => productAdd.addOn)
  productAddOns: ProductAddOn[];
}
