import { Body, Controller, Get, Param, Res } from '@nestjs/common';
import { DefaultController } from 'src/modules/default.controller';
import { CompanyService } from 'src/services/domains/company.service';
import { FindCategoriesFilters } from './dtos/find-categories-filters';
import { Response } from 'express';
import { CategoryService } from 'src/services/domains/category.service';
import { ProductService } from 'src/services/domains/product.service';
import { FindProductsFilters } from './dtos/find-products-filters';
import { FindStoresFilters } from './dtos/find-stores-filters';
import { FindPaymentTypesFilters } from './dtos/find-payment-types-filters';
import { PaymentTypeService } from 'src/services/domains/payment-type.service';

@Controller('customer/stores')
export class StoresController extends DefaultController {
  constructor(
    private storeService: CompanyService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private paymentTypeService: PaymentTypeService,
  ) {
    super();
  }

  @Get('/:companyId/delivery-fees/:neighborhoodCode')
  async getDeliveryFee(
    @Param('companyId') companyId: string,
    @Param('neighborhoodCode') neighborhoodCode: number,
  ): Promise<number> {
    this.validateAccess('findDeliveryFee');
    return this.storeService.getDeliveryFee(companyId, neighborhoodCode);
  }

  @Get('/:companyId/categories')
  async findAllCategories(
    @Body() body: FindCategoriesFilters,
    @Param('companyId') companyId: string,
    @Res() res: Response,
  ): Promise<any> {
    this.validateAccess('findAllCategories');

    const category = this.categoryService.findAll({ ...body, companyId });

    res.status(200).send(category);
  }

  @Get('/:companyId/products')
  async findAllProducts(
    @Body() body: FindProductsFilters,
    @Param('companyId') companyId: string,
    @Res() res: Response,
  ) {
    this.validateAccess('findAllProducts');
    const products = this.productService.findByCategory(body.categoryId, body);

    res.status(200).send(products);
  }

  @Get()
  async findAllStores(@Body() body: FindStoresFilters, @Res() res: Response) {
    this.validateAccess('findAllStores');
    const stores = this.storeService.findAll(body);

    res.status(200).send(stores);
  }

  @Get()
  async findAllPaymentTypes(
    @Body() body: FindPaymentTypesFilters,
    @Res() res: Response,
  ) {
    this.validateAccess('findAllPaymentTypes');
    const paymentTypes = this.paymentTypeService.findAll(body);

    res.status(200).send(paymentTypes);
  }
}
