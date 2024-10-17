import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { DefaultController } from 'src/modules/default.controller';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { FindProductsFilters } from './dtos/find-products-filters';
import { ProductService } from 'src/services/domains/product.service';
import { Product } from 'src/entities/product.entity';
import { CreateProductBody } from './dtos/create-product-body';
import { UpdateProductBody } from './dtos/update-product-body';
import { AddOptionsToProductBody } from './dtos/add-options-to-product-body';
import { ProductOptionService } from 'src/services/domains/product-option.service';

@Controller('admin/users')
export class ProductsController extends DefaultController {
  constructor(
    private productService: ProductService,
    private productOptionService: ProductOptionService,
  ) {
    super();
  }

  @Get()
  async findAll(
    @Body() body: FindProductsFilters,
  ): Promise<EntityPagination<Product>> {
    this.validateAccess('findAllProducts');

    return this.productService.findAll(
      body,
      [],
      [
        {
          entity: 'productAddOns',
          nestedEntity: 'addOn',
        },
        {
          entity: 'productOptions',
          nestedEntity: 'values',
        },
      ],
    );
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: any) {
    this.validateAccess('findProductById');
    const user = await this.productService.findById(id);

    res.status(200).send(user);
  }

  @Post()
  async create(@Body() body: CreateProductBody, @Res() res: any) {
    this.validateAccess('createProduct');

    const product = await this.productService.create(body);

    res.status(201).send(product);
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateProductBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    this.validateAccess('updateProduct');
    const product = await this.productService.update(id, body);

    res.status(200).send(product);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: any) {
    this.validateAccess('deleteProduct');
    await this.productService.delete(id);

    res.status(204).send();
  }

  @Post('/:id/options')
  async addOption(@Body() body: AddOptionsToProductBody, @Res() res: any) {
    this.validateAccess('addOptionToProduct');

    const productOption = await this.productOptionService.create(body);

    if (body.values) {
      await this.productOptionService.addValues(productOption.id, body.values);
    }

    res.status(201).send(productOption);
  }

  @Delete('/:id/options/:optionId')
  async removeOption(@Param('optionId') optionId: string, @Res() res: any) {
    this.validateAccess('removeOptionFromProduct');

    await this.productOptionService.delete(optionId);

    res.status(204).send();
  }

  @Post('/:id/add-ons/:addOnId')
  async addAddOn(
    @Param('id') productId: string,
    @Param('addOnId') addOnId: string,
    @Res() res: any,
  ) {
    this.validateAccess('addAddOnToProduct');

    const product = await this.productService.addAddOn(productId, addOnId);

    res.status(201).send(product);
  }

  @Delete('/:id/add-ons/:addOnId')
  async removeAddOn(
    @Param('id') productId: string,
    @Param('addOnId') addOnId: string,
    @Res() res: any,
  ) {
    this.validateAccess('removeAddOnFromProduct');

    await this.productService.removeAddOn(productId, addOnId);

    res.status(204).send();
  }
}
