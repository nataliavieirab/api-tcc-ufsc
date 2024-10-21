import { Injectable } from '@nestjs/common';
import { StoreRepository } from 'src/repositories/store.repository';
import { EntityDefaultService } from './entity-default.service';
import { Store } from 'src/entities/store.entity';
import { DeliverySettingsRepository } from 'src/repositories/delivery-settings.repository';

@Injectable()
export class StoreService extends EntityDefaultService<Store> {
  constructor(
    storeRepository: StoreRepository,
    private deliverySettingsRepository: DeliverySettingsRepository,
  ) {
    super(storeRepository);
  }

  async create(createInput: EntitySearchKeys<Store>): Promise<Store> {
    const store = await this.repository.create(createInput);

    store.deliverySettings = await this.deliverySettingsRepository.create({
      store,
    });

    return store;
  }
}
