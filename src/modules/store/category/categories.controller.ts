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
import { CategoryService } from 'src/services/domains/category.service';
import { FindCategoriesFilters } from './dtos/find-categories-filters';
import { Response } from 'express';
import { CreateCategoryBody } from './dtos/create-category-body';
import { UpdateCategoryBody } from './dtos/update-category-body';
import { Actions } from 'src/services/permissions/permissions';
import { AddItemToCategoryBody } from './dtos/add-item-to-category-body';

@Controller('store/:storeId/categories')
export class CategoriesController extends DefaultController {
  constructor(private categoryService: CategoryService) {
    super();
  }

  module = 'store';

  @Get()
  async findAll(
    @Param('storeId') storeId: string,
    @Body() body: FindCategoriesFilters,
  ) {
    await this.validateAccess(Actions.findCategories);
    return this.categoryService.findAll({ storeId, ...body });
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess(Actions.findCategories);
    const category = await this.categoryService.findById(id);

    res.status(200).send(category);
  }

  @Post()
  async create(
    @Param('storeId') storeId: string,
    @Body() body: CreateCategoryBody,
    @Res() res: Response,
  ) {
    await this.validateAccess(Actions.createCategory);
    const category = await this.categoryService.create({ storeId, ...body });

    res.status(201).send(category);
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateCategoryBody,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.validateAccess(Actions.updateCategory);
    const category = await this.categoryService.update(id, body);

    res.status(200).send(category);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess(Actions.deleteCategory);
    await this.categoryService.delete(id);

    res.status(204).send();
  }

  @Post('/:id/products')
  async addProduct(
    @Body() body: AddItemToCategoryBody,
    @Res() res: Response,
    @Param('id') categoryId: string,
  ) {
    await this.validateAccess(Actions.updateCategory);
    const addedItem = await this.categoryService.addProduct({
      categoryId,
      ...body,
    });

    res.status(201).send(addedItem);
  }

  @Delete('/:id/products/:productId')
  async removeProduct(
    @Res() res: Response,
    @Param('id') categoryId: string,
    @Param('productId') productId: string,
  ) {
    await this.validateAccess(Actions.updateCategory);
    await this.categoryService.removeProduct(categoryId, productId);

    res.status(204).send();
  }

  @Get('/:id/products')
  async findProduct(@Res() res: Response, @Param('id') categoryId: string) {
    await this.validateAccess(Actions.findCategories);
    const items = await this.categoryService.getItems(categoryId);

    res.status(200).send(items);
  }
}
