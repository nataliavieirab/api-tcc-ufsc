import { Module } from '@nestjs/common';
import { OrdersController } from './order/orders.controller';
import { BagsController } from './order/bags.controller';
import { AccountsController } from './register/accounts.controller';
import { StoresController } from './store/stores.controller';
import { OrderService } from 'src/services/domains/order.service';
import { CustomerService } from 'src/services/domains/customer.service';
import { BagService } from 'src/services/domains/bag.service';
import { StoreService } from 'src/services/domains/store.service';
import { CategoryService } from 'src/services/domains/category.service';
import { ProductService } from 'src/services/domains/product.service';
import { PaymentTypeService } from 'src/services/domains/payment-type.service';
import { OrderRepository } from 'src/repositories/order.repository';
import { StoreRepository } from 'src/repositories/store.repository';
import { CategoryRepository } from 'src/repositories/category.repository';
import { ProductRepository } from 'src/repositories/product.repository';
import { PaymentTypeRepository } from 'src/repositories/payment-type.repository';
import { CustomerRepository } from 'src/repositories/customer.repository';
import { BagRepository } from 'src/repositories/bag.repository';
import { AddressRepository } from 'src/repositories/address.repository';
import { ShippingRepository } from 'src/repositories/shipping.repository';
import { CashRegisterRepository } from 'src/repositories/cash-register.repository';
import { CurrentRequestService } from 'src/services/application/current-request.service';
import { PaymentRepository } from 'src/repositories/payment.repository';
import { BagItemRepository } from 'src/repositories/bag-item.repository';
import { BagItemAddOnRepository } from 'src/repositories/bag-item-add-on.repository';
import { BagItemOptionRepository } from 'src/repositories/bag-item-option.repository';
import { ProductSetItemRepository } from 'src/repositories/product-set-item.repository';
import { ProductOptionRepository } from 'src/repositories/product-option.repository';
import { ProductOptionValueRepository } from 'src/repositories/product-option-value.repository';
import { ProductAddOnRepository } from 'src/repositories/product-add-on.repository';
import { DeliverySettingsRepository } from 'src/repositories/delivery-settings.repository';
import { DeliveryNeighborhoodRepository } from 'src/repositories/delivery-neighborhood.repository';
import { AddOnRepository } from 'src/repositories/add-on.repository';
import { ProductCategoryRepository } from 'src/repositories/product-category.repository';
import { CustomerAddressRepository } from 'src/repositories/customer-address.repository';

@Module({
  controllers: [
    OrdersController,
    BagsController,
    StoresController,
    AccountsController,
  ],
  providers: [
    OrderService,
    BagService,
    StoreService,
    CategoryService,
    ProductService,
    PaymentTypeService,
    CustomerService,
    OrderRepository,
    StoreRepository,
    CategoryRepository,
    ProductRepository,
    PaymentTypeRepository,
    CustomerRepository,
    BagRepository,
    AddressRepository,
    ShippingRepository,
    CashRegisterRepository,
    CurrentRequestService,
    PaymentRepository,
    BagItemRepository,
    BagItemAddOnRepository,
    BagItemOptionRepository,
    ProductSetItemRepository,
    ProductOptionRepository,
    ProductOptionValueRepository,
    ProductAddOnRepository,
    DeliverySettingsRepository,
    DeliveryNeighborhoodRepository,
    AddOnRepository,
    ProductCategoryRepository,
    CustomerAddressRepository,
  ],
})
export class CustomerModule {}
