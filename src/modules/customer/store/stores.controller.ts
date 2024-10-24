import { Body, Controller, Get, Param } from '@nestjs/common';
import { StoreService } from 'src/services/domains/store.service';
import { FindCategoriesFilters } from './dtos/find-categories-filters';
import { CategoryService } from 'src/services/domains/category.service';
import { ProductService } from 'src/services/domains/product.service';
import { FindProductsFilters } from './dtos/find-products-filters';
import { FindStoresFilters } from './dtos/find-stores-filters';
import { PaymentTypeService } from 'src/services/domains/payment-type.service';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { Category } from 'src/entities/category.entity';
import { Store } from 'src/entities/store.entity';
import { PaymentType } from 'src/entities/payment-type.entity';

@Controller('customer/stores')
export class StoresController {
  constructor(
    private storeService: StoreService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private paymentTypeService: PaymentTypeService,
  ) {}

  @Get('/:storeId/delivery-fees/:neighborhoodCode')
  async getDeliveryFee(
    @Param('storeId') storeId: string,
    @Param('neighborhoodCode') neighborhoodCode: string,
  ): Promise<number> {
    return this.storeService.getDeliveryFee(storeId, neighborhoodCode);
  }

  @Get('/:storeId/categories')
  async findAllCategories(
    @Body() body: FindCategoriesFilters,
    @Param('storeId') storeId: string,
  ): Promise<EntityPagination<Category>> {
    return this.categoryService.findAll({ ...body, storeId });
  }

  @Get('/:storeId/categories/:categoryId/products')
  async findAllProducts(
    @Body() body: FindProductsFilters,
    @Param('categoryId') categoryId: string,
  ) {
    return this.productService.findByCategory(categoryId, true, body);
  }

  @Get()
  async findAllStores(
    @Body() body: FindStoresFilters,
  ): Promise<EntityPagination<Store>> {
    return this.storeService.findAll(body, ['deliverySettings']);
  }

  @Get('/:storeId/payment-types')
  async findAllPaymentTypes(
    @Param('storeId') storeId: string,
  ): Promise<EntityPagination<PaymentType>> {
    return this.paymentTypeService.findAll({ storeId });
  }
}
