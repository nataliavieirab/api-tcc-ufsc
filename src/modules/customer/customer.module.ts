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
  ],
})
export class CustomerModule {}
