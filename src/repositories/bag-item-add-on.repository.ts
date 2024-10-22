import { DefaultRepository } from './default.repository';
import { BagItemAddOn } from 'src/entities/bag-item-add-on.entity';

export class BagItemAddOnRepository extends DefaultRepository<BagItemAddOn> {
  constructor() {
    super(BagItemAddOn);
  }
}
