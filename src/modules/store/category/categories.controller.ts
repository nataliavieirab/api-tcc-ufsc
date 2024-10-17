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

@Controller('store/categories')
export class CategoryController extends DefaultController {
  constructor(private categoryService: CategoryService) {
    super();
  }

  @Get()
  async findAll(@Body() body: FindCategoriesFilters) {
    this.validateAccess('findAllCategories');
    return this.categoryService.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    this.validateAccess('findCategoryById');
    const category = await this.categoryService.findById(id);

    res.status(200).send(category);
  }

  @Post()
  async create(@Body() body: CreateCategoryBody, @Res() res: Response) {
    this.validateAccess('createCategory');
    const category = await this.categoryService.create(body);

    res.status(201).send(category);
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateCategoryBody,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    this.validateAccess('updateCategory');
    const category = await this.categoryService.update(id, body);

    res.status(200).send(category);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    this.validateAccess('deleteCategory');
    await this.categoryService.delete(id);

    res.status(204).send();
  }
}
