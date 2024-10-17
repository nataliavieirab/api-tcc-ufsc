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
import { Role } from './role.entity';

@Entity()
export class Company extends DefaultEntity {
  @Column()
  name: string;

  @OneToOne(
    () => DeliverySettings,
    (deliverySettings) => deliverySettings.company,
  )
  deliverySettings: DeliverySettings;

  @OneToMany(() => Role, (role) => role.company)
  roles: Role[];

  @OneToMany(() => CashRegister, (cashRegister) => cashRegister.company)
  cashRegisters: CashRegister[];

  @OneToOne(() => CompanyAddress, (address) => address.company)
  address?: CompanyAddress;

  @OneToMany(() => PaymentType, (paymentType) => paymentType.company)
  paymentTypes: PaymentType[];

  @OneToMany(() => Product, (product) => product.company)
  products: Product[];

  @OneToMany(() => ProductSet, (productSet) => productSet.company)
  productSets: ProductSet[];

  @OneToMany(() => Category, (category) => category.company)
  categories: Category[];

  @OneToMany(() => AddOn, (addOn) => addOn.company)
  addOns: AddOn[];
}
