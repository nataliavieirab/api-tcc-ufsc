import { Injectable } from '@nestjs/common';
import { StoreRepository } from 'src/repositories/store.repository';
import { EntityDefaultService } from './entity-default.service';
import { Store } from 'src/entities/store.entity';

@Injectable()
export class StoreService extends EntityDefaultService<Store> {
  constructor(storeRepository: StoreRepository) {
    super(storeRepository);
  }
}
