import { DefaultRepository } from './default.repository';
import { Store } from 'src/entities/store.entity';

export class StoreRepository extends DefaultRepository<Store> {
  constructor() {
    super(Store);
  }
}
