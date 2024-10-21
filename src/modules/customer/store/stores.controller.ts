import { Body, Controller, Get, Param, Res } from '@nestjs/common';
import { DefaultController } from 'src/modules/default.controller';
import { StoreService } from 'src/services/domains/store.service';
import { FindCategoriesFilters } from './dtos/find-categories-filters';
import { Response } from 'express';
import { CategoryService } from 'src/services/domains/category.service';
import { ProductService } from 'src/services/domains/product.service';
import { FindProductsFilters } from './dtos/find-products-filters';
import { FindStoresFilters } from './dtos/find-stores-filters';
import { FindPaymentTypesFilters } from './dtos/find-payment-types-filters';
import { PaymentTypeService } from 'src/services/domains/payment-type.service';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import { Store } from 'src/entities/store.entity';
import { PaymentType } from 'src/entities/payment-type.entity';

@Controller('customer/stores')
export class StoresController extends DefaultController {
  constructor(
    private storeService: StoreService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private paymentTypeService: PaymentTypeService,
  ) {
    super();
  }

  @Get('/:storeId/delivery-fees/:neighborhoodCode')
  async getDeliveryFee(
    @Param('storeId') storeId: string,
    @Param('neighborhoodCode') neighborhoodCode: number,
  ): Promise<number> {
    this.validateAccess('findDeliveryFee');
    return this.storeService.getDeliveryFee(storeId, neighborhoodCode);
  }

  @Get('/:storeId/categories')
  async findAllCategories(
    @Body() body: FindCategoriesFilters,
    @Param('storeId') storeId: string,
  ): Promise<EntityPagination<Category>> {
    this.validateAccess('findAllCategories');

    return this.categoryService.findAll({ ...body, storeId });
  }

  @Get('/:storeId/products')
  async findAllProducts(
    @Body() body: FindProductsFilters,
    @Param('storeId') storeId: string,
  ): Promise<EntityPagination<Product>> {
    this.validateAccess('findAllProducts');
    return this.productService.findByCategory(body.categoryId, body);
  }

  @Get()
  async findAllStores(
    @Body() body: FindStoresFilters,
  ): Promise<EntityPagination<Store>> {
    this.validateAccess('findAllStores');
    return this.storeService.findAll(body);
  }

  @Get()
  async findAllPaymentTypes(
    @Body() body: FindPaymentTypesFilters,
  ): Promise<EntityPagination<PaymentType>> {
    this.validateAccess('findAllPaymentTypes');
    return this.paymentTypeService.findAll(body);
  }
}
