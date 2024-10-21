import { Store } from 'src/entities/store.entity';
import { ProductCategory } from 'src/entities/product-category.entity';

export class CreateCategoryBody {
  store: Store;

  name: string;

  productCategories: ProductCategory[];
}
