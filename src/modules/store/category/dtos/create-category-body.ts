import { Company } from 'src/entities/company.entity';
import { ProductCategory } from 'src/entities/product-category.entity';

export class CreateCategoryBody {
  company: Company;

  name: string;

  productCategories: ProductCategory[];
}
