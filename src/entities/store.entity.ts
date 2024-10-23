import { Column, Entity, OneToMany, OneToOne, Unique } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { CashRegister } from './cash-register.entity';
import { StoreAddress } from './store-address.entity';
import { PaymentType } from './payment-type.entity';
import { Product } from './product.entity';
import { ProductSet } from './product-set.entity';
import { DeliverySettings } from './delivery-settings.entity';
import { Category } from './category.entity';
import { AddOn } from './add-on.entity';
import { Role } from './role.entity';

@Entity()
export class Store extends DefaultEntity {
  @Column()
  @Unique('name', [])
  name: string;

  @OneToOne(
    () => DeliverySettings,
    (deliverySettings) => deliverySettings.store,
  )
  deliverySettings: DeliverySettings;

  @OneToMany(() => Role, (role) => role.store)
  roles: Role[];

  @OneToMany(() => CashRegister, (cashRegister) => cashRegister.store)
  cashRegisters: CashRegister[];

  @OneToOne(() => StoreAddress, (address) => address.store)
  address?: StoreAddress;

  @OneToMany(() => PaymentType, (paymentType) => paymentType.store)
  paymentTypes: PaymentType[];

  @OneToMany(() => Product, (product) => product.store)
  products: Product[];

  @OneToMany(() => ProductSet, (productSet) => productSet.store)
  productSets: ProductSet[];

  @OneToMany(() => Category, (category) => category.store)
  categories: Category[];

  @OneToMany(() => AddOn, (addOn) => addOn.store)
  addOns: AddOn[];
}
