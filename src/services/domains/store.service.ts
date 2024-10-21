import { Injectable } from '@nestjs/common';
import { StoreRepository } from 'src/repositories/store.repository';
import { EntityDefaultService } from './entity-default.service';
import { Store } from 'src/entities/store.entity';
import { DeliverySettingsRepository } from 'src/repositories/delivery-settings.repository';
import { DeliveryNeighborhoodRepository } from 'src/repositories/delivery-neighborhood.repository';
import { RecordNotFoundError } from 'src/errors/record-not-found.error';

@Injectable()
export class StoreService extends EntityDefaultService<Store> {
  constructor(
    storeRepository: StoreRepository,
    private deliverySettingsRepository: DeliverySettingsRepository,
    private deliveryNeighborhoodRepository: DeliveryNeighborhoodRepository,
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

  async getDeliveryFee(
    storeId: string,
    neighborhoodCode: string,
  ): Promise<number> {
    const deliverySettings = this.deliverySettingsRepository.getQueryFor({
      conditions: {
        storeId,
      },
    });

    const deliveryNeighborhood =
      await this.deliveryNeighborhoodRepository.findOne({
        conditions: {
          neighborhoodCode,
        },
        joins: {
          deliverySettings,
        },
      });

    if (!deliveryNeighborhood)
      throw new RecordNotFoundError('DeliveryNeighborhood', neighborhoodCode);

    return deliveryNeighborhood.deliveryFee;
  }
}
