import { DefaultRepository } from './default.repository';
import { ProductSet } from 'src/entities/product-set.entity';

export class ProductSetRepository extends DefaultRepository<ProductSet> {
  constructor() {
    super(ProductSet);
  }

  accessibilityQuery(store) {
    return { store };
  }
}
