import { DefaultRepository } from './default.repository';
import { Bag } from 'src/entities/bag.entity';

export class BagRepository extends DefaultRepository<Bag> {
  constructor() {
    super(Bag);
  }
}
