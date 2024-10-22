import { DefaultRepository } from './default.repository';
import { AddOn } from 'src/entities/add-on.entity';

export class AddOnRepository extends DefaultRepository<AddOn> {
  constructor() {
    super(AddOn);
  }
}
