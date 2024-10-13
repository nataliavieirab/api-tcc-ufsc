import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/repositories/category.repository';
import { EntityDefaultService } from './entity-default.service';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoryService extends EntityDefaultService<Category> {
  constructor(categoryRepository: CategoryRepository) {
    super(categoryRepository);
  }
}
