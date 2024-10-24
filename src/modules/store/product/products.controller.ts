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
import { AddAddOnToProductBody } from './dtos/add-add-on-to-product-body';
import { Actions } from 'src/services/permissions/permissions';

@Controller('store/:storeId/products')
export class ProductsController extends DefaultController {
  constructor(
    private productService: ProductService,
    private productOptionService: ProductOptionService,
  ) {
    super();
  }

  module = 'store';

  @Get()
  async findAll(
    @Body() body: FindProductsFilters,
    @Param('storeId') storeId: string,
  ): Promise<EntityPagination<Product>> {
    await this.validateAccess(Actions.findProducts);

    return this.productService.findAll(
      { storeId, ...body },
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
    await this.validateAccess(Actions.findProducts);
    const user = await this.productService.findById(
      id,
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

    res.status(200).send(user);
  }

  @Post()
  async create(
    @Body() body: CreateProductBody,
    @Res() res: any,
    @Param('storeId') storeId: string,
  ) {
    await this.validateAccess(Actions.createProduct);

    const product = await this.productService.create({ storeId, ...body });

    res.status(201).send(product);
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateProductBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    await this.validateAccess(Actions.updateProduct);
    const product = await this.productService.update(id, body);

    res.status(200).send(product);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: any) {
    await this.validateAccess(Actions.deleteProduct);
    await this.productService.delete(id);

    res.status(204).send();
  }

  @Post('/:id/options')
  async addOption(
    @Param('id') productId: string,
    @Body() body: AddOptionsToProductBody,
    @Res() res: any,
  ) {
    await this.validateAccess(Actions.addOptionToProduct);

    const productOption = await this.productOptionService.create({
      productId,
      ...body,
    });

    if (body.values) {
      await this.productOptionService.addValues(productOption.id, body.values);
    }

    res.status(201).send(productOption);
  }

  @Delete('/:id/options/:optionId')
  async removeOption(@Param('optionId') optionId: string, @Res() res: any) {
    await this.validateAccess(Actions.removeOptionFromProduct);

    await this.productOptionService.delete(optionId);

    res.status(204).send();
  }

  @Post('/:id/add-ons')
  async addAddOn(
    @Param('id') productId: string,
    @Body() body: AddAddOnToProductBody,
    @Res() res: any,
  ) {
    await this.validateAccess(Actions.addAddOnToProduct);

    const { price, addOnId } = body;

    const product = await this.productService.addAddOn(
      productId,
      addOnId,
      price,
    );

    res.status(201).send(product);
  }

  @Delete('/:id/add-ons/:addOnId')
  async removeAddOn(
    @Param('id') productId: string,
    @Param('addOnId') addOnId: string,
    @Res() res: any,
  ) {
    await this.validateAccess(Actions.removeAddOnFromProduct);

    await this.productService.removeAddOn(productId, addOnId);

    res.status(204).send();
  }
}
