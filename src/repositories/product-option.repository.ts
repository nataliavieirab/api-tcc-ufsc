import { DefaultRepository } from './default.repository';
import { ProductOption } from 'src/entities/product-option.entity';

export class ProductOptionRepository extends DefaultRepository<ProductOption> {
  constructor() {
    super(ProductOption);
  }
}
