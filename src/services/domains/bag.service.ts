import { Injectable } from '@nestjs/common';
import { BagRepository } from 'src/repositories/bag.repository';
import { EntityDefaultService } from './entity-default.service';
import { Bag } from 'src/entities/bag.entity';

@Injectable()
export class BagService extends EntityDefaultService<Bag> {
  constructor(bagRepository: BagRepository) {
    super(bagRepository);
  }
}
