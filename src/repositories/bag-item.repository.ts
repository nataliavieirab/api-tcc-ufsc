import { DefaultRepository } from './default.repository';
import { BagItem } from 'src/entities/bag-item.entity';

export class BagItemRepository extends DefaultRepository<BagItem> {
  constructor() {
    super(BagItem);
  }
}
