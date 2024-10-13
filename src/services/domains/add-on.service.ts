import { Injectable } from '@nestjs/common';
import { AddOnRepository } from 'src/repositories/add-on.repository';
import { EntityDefaultService } from './entity-default.service';
import { AddOn } from 'src/entities/add-on.entity';

@Injectable()
export class AddOnService extends EntityDefaultService<AddOn> {
  constructor(addOnRepository: AddOnRepository) {
    super(addOnRepository);
  }
}
