import { ProductCategory } from 'src/entities/product-category.entity';

export class UpdateCategoryBody {
  name: string;

  productCategories: ProductCategory[];
}
