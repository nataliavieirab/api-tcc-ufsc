import { DefaultRepository } from './default.repository';
import { Product } from 'src/entities/product.entity';

export class ProductRepository extends DefaultRepository<Product> {
  constructor() {
    super(Product);
  }

  accessibilityQuery(store) {
    return { store };
  }
}
