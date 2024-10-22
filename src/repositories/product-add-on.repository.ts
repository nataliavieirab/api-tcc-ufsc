import { DefaultRepository } from './default.repository';
import { ProductAddOn } from 'src/entities/product-add-on.entity';

export class ProductAddOnRepository extends DefaultRepository<ProductAddOn> {
  constructor() {
    super(ProductAddOn);
  }
}
