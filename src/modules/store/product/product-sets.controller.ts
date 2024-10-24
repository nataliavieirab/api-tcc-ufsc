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
import { ProductSetService } from 'src/services/domains/product-set.service';
import { FindProductSetsFilters } from './dtos/find-product-sets-filters';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { ProductSet } from 'src/entities/product-set.entity';
import { Response } from 'express';
import { CreateProductSetBody } from './dtos/create-product-set-body';
import { UpdateProductSetBody } from './dtos/update-product-set-body';
import { Actions } from 'src/services/permissions/permissions';
import { AddItemToProductSetBody } from './dtos/add-item-to-product-set-body';

@Controller('store/:storeId/product-sets')
export class ProductSetsController extends DefaultController {
  constructor(private productSetService: ProductSetService) {
    super();
  }

  module = 'store';

  @Get()
  async findAll(
    @Body() body: FindProductSetsFilters,
  ): Promise<EntityPagination<ProductSet>> {
    await this.validateAccess(Actions.findProductSets);
    return this.productSetService.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess(Actions.findProductSets);
    const productSet = await this.productSetService.findById(id);

    res.status(200).send(productSet);
  }

  @Post()
  async create(
    @Body() body: CreateProductSetBody,
    @Res() res: Response,
    @Param('storeId') storeId: string,
  ) {
    await this.validateAccess(Actions.createProductSet);
    const productSet = await this.productSetService.create({
      storeId,
      ...body,
    });

    res.status(201).send(productSet);
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateProductSetBody,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.validateAccess(Actions.updateProductSet);
    const productSet = await this.productSetService.update(id, body);

    res
      .status(200)
      .send({ message: 'Product Set updated succesfully!', ...productSet });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess(Actions.deleteProductSet);
    await this.productSetService.delete(id);

    res.status(204).send({ message: 'Product Set deleted successfully!' });
  }

  @Post('/:id/products')
  async addProduct(
    @Body() body: AddItemToProductSetBody,
    @Res() res: Response,
    @Param('id') productSetId: string,
  ) {
    await this.validateAccess(Actions.addProductToSet);
    const addedItem = await this.productSetService.addProduct({
      productSetId,
      ...body,
    });

    res.status(201).send(addedItem);
  }

  @Delete('/:id/products/:productId')
  async removeProduct(
    @Res() res: Response,
    @Param('id') productSetId: string,
    @Param('productId') productId: string,
  ) {
    await this.validateAccess(Actions.removeProductFromSet);
    await this.productSetService.removeProduct(productSetId, productId);

    res.status(204).send();
  }

  @Get('/:id/products')
  async findProduct(@Res() res: Response, @Param('id') productSetId: string) {
    await this.validateAccess(Actions.findProductSets);
    const items = await this.productSetService.getItems(productSetId);

    res.status(200).send(items);
  }
}
