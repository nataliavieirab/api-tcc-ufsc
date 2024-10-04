import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { CashRegister } from './cash-register.entity';
import { CompanyAddress } from './company-address.entity';
import { PaymentType } from './payment-type.entity';
import { Product } from './product.entity';
import { ProductSet } from './product-set.entity';
import { DeliverySettings } from './delivery-settings.entity';
import { Category } from './category.entity';
import { AddOn } from './add-on.entity';

@Entity()
export class Company extends DefaultEntity {
  @Column()
  name: string;

  @OneToOne(
    () => DeliverySettings,
    (deliverySettings) => deliverySettings.company,
  )
  deliverySettings: DeliverySettings;

  @OneToMany(() => CashRegister, (cashRegister) => cashRegister.company)
  cashRegister: CashRegister[];

  @OneToOne(() => CompanyAddress, (address) => address.company)
  address?: CompanyAddress;

  @OneToMany(() => PaymentType, (address) => address.company)
  paymentTypes: PaymentType[];

  @OneToMany(() => Product, (address) => address.company)
  products: Product[];

  @OneToMany(() => ProductSet, (address) => address.company)
  productSets: ProductSet[];

  @OneToMany(() => Category, (address) => address.company)
  categories: Category[];

  @OneToMany(() => AddOn, (address) => address.company)
  addOns: AddOn[];
}
