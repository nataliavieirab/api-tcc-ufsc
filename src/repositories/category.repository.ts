import { DefaultRepository } from './default.repository';
import { Category } from 'src/entities/category.entity';

export class CategoryRepository extends DefaultRepository<Category> {
  constructor() {
    super(Category);
  }
}
