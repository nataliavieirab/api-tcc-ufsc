import { Module } from '@nestjs/common';
import { CashRegistersController } from './cash_register/cash-registers.controller';
import { CashRegisterRepository } from 'src/repositories/cash-register.repository';
import { CashRegisterService } from 'src/services/domains/cash-register.service';
import { CategoriesController } from './category/categories.controller';
import { CategoryService } from 'src/services/domains/category.service';
import { CategoryRepository } from 'src/repositories/category.repository';
import { DeliverySettingsController } from './delivery_settings/delivery-settings.controller';
import { DeliverySettingsService } from 'src/services/domains/delivery-settings.service';
import { DeliverySettingsRepository } from 'src/repositories/delivery-settings.repository';
import { OrdersController } from './order/orders.controller';
import { OrderService } from 'src/services/domains/order.service';
import { OrderRepository } from 'src/repositories/order.repository';
import { PaymentTypeController } from './payment_type/payment-types.controller';
import { PaymentTypeService } from 'src/services/domains/payment-type.service';
import { PaymentTypeRepository } from 'src/repositories/payment-type.repository';
import { ProductsController } from './product/products.controller';
import { ProductService } from 'src/services/domains/product.service';
import { ProductRepository } from 'src/repositories/product.repository';
import { ProductOptionRepository } from 'src/repositories/product-option.repository';
import { ProductOptionService } from 'src/services/domains/product-option.service';
import { AddOnController } from './product/add-ons.controller';
import { AddOnService } from 'src/services/domains/add-on.service';
import { AddOnRepository } from 'src/repositories/add-on.repository';
import { ProductSetsController } from './product/product-sets.controller';
import { ProductSetService } from 'src/services/domains/product-set.service';
import { ProductSetRepository } from 'src/repositories/product-set.repository';
import { RolesController } from './role/roles.controller';
import { RoleService } from 'src/services/domains/role.service';
import { RoleRepository } from 'src/repositories/role.repository';
import { UsersController } from './user/users.controller';
import { UserService } from 'src/services/domains/user.service';
import { UserRepository } from 'src/repositories/user.repository';
import { StoreService } from 'src/services/domains/store.service';
import { CurrentRequestService } from 'src/services/application/current-request.service';
import { DeliveryNeighborhoodRepository } from 'src/repositories/delivery-neighborhood.repository';
import { BagRepository } from 'src/repositories/bag.repository';
import { AddressRepository } from 'src/repositories/address.repository';
import { ShippingRepository } from 'src/repositories/shipping.repository';
import { PaymentRepository } from 'src/repositories/payment.repository';
import { StoreRepository } from 'src/repositories/store.repository';
import { ProductAddOnRepository } from 'src/repositories/product-add-on.repository';
import { ProductCategoryRepository } from 'src/repositories/product-category.repository';
import { ProductOptionValueRepository } from 'src/repositories/product-option-value.repository';
import { RolePermissionRepository } from 'src/repositories/role-permission.repository';
import { UserRoleRepository } from 'src/repositories/user-role.repository';

@Module({
  controllers: [
    CashRegistersController,
    CategoriesController,
    DeliverySettingsController,
    OrdersController,
    PaymentTypeController,
    ProductsController,
    AddOnController,
    ProductSetsController,
    RolesController,
    UsersController,
  ],
  providers: [
    CashRegisterService,
    CashRegisterRepository,
    CategoryService,
    CategoryRepository,
    DeliverySettingsService,
    DeliverySettingsRepository,
    OrderService,
    OrderRepository,
    PaymentTypeService,
    PaymentTypeRepository,
    ProductService,
    ProductRepository,
    ProductOptionService,
    ProductOptionRepository,
    AddOnService,
    AddOnRepository,
    ProductSetService,
    ProductSetRepository,
    RoleService,
    RoleRepository,
    UserService,
    UserRepository,
    StoreService,
    CurrentRequestService,
    DeliveryNeighborhoodRepository,
    BagRepository,
    AddressRepository,
    ShippingRepository,
    PaymentRepository,
    StoreRepository,
    ProductAddOnRepository,
    ProductCategoryRepository,
    ProductOptionValueRepository,
    RolePermissionRepository,
    UserRoleRepository,
  ],
})
export class StoreModule {}
