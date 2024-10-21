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

@Controller('store/productsets')
export class ProductSetsController extends DefaultController {
  constructor(private productSetService: ProductSetService) {
    super();
  }

  module = 'store';

  @Get()
  async findAll(
    @Body() body: FindProductSetsFilters,
  ): Promise<EntityPagination<ProductSet>> {
    await this.validateAccess('findProductSetsFilters');
    return this.productSetService.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess('findProductSetsById');
    const productSet = await this.productSetService.findById(id);

    res.status(200).send(productSet);
  }

  @Post()
  async create(@Body() body: CreateProductSetBody, @Res() res: Response) {
    await this.validateAccess('createProductSet');
    const productSet = await this.productSetService.create(body);

    res
      .status(201)
      .send({ message: 'Product Set created succesfully!', ...productSet });
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateProductSetBody,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.validateAccess('updateProductSet');
    const productSet = await this.productSetService.update(id, body);

    res
      .status(200)
      .send({ message: 'Product Set updated succesfully!', ...productSet });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess('deleteProductSet');
    await this.productSetService.delete(id);

    res.status(204).send({ message: 'Product Set deleted successfully!' });
  }
}
