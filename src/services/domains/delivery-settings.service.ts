import { Injectable } from '@nestjs/common';
import { DeliverySettingsRepository } from 'src/repositories/delivery-settings.repository';
import { EntityDefaultService } from './entity-default.service';
import {
  DeliverySettings,
  DeliveryStatus,
} from 'src/entities/delivery-settings.entity';
import { DeliveryNeighborhoodRepository } from 'src/repositories/delivery-neighborhood.repository';
import { DeliveryNeighborhood } from 'src/entities/delivery-neighborhood.entity';
import { EntityPagination } from 'src/utils/entity-pagination.type';

@Injectable()
export class DeliverySettingsService extends EntityDefaultService<DeliverySettings> {
  constructor(
    deliverySettingsRepository: DeliverySettingsRepository,
    private deliveryNeighborhoodRepository: DeliveryNeighborhoodRepository,
  ) {
    super(deliverySettingsRepository);
  }

  async findByStore(storeId: string) {
    return await this.repository.findOne({
      conditions: {
        storeId,
      },
    });
  }

  async openDelivery(storeId: string): Promise<void> {
    const deliverySettings = await this.findByStore(storeId);

    await this.repository.update(deliverySettings.id, {
      status: DeliveryStatus.OPEN,
    });
  }

  async closeDelivery(storeId: string): Promise<void> {
    const deliverySettings = await this.findByStore(storeId);

    await this.repository.update(deliverySettings.id, {
      status: DeliveryStatus.CLOSED,
    });
  }

  async addNeighborhood(
    storeId: string,
    neighborhood: {
      neighborhoodCode: string;
      neighborhoodName: string;
      deliveryFee: number;
    },
  ) {
    const deliverySettings = await this.findByStore(storeId);

    return await this.deliveryNeighborhoodRepository.create({
      deliverySettings,
      ...neighborhood,
    });
  }

  async findAllNeighborhoods(
    storeId: string,
    filters: {
      name?: string;
      like_name?: string;
      like_code?: string;
      code?: string;
    },
  ): Promise<EntityPagination<DeliveryNeighborhood>> {
    const { likeFilters, simpleFilters } = await this.transformDecoratedFilters(
      filters,
    );

    const deliverySettings = await this.findByStore(storeId);

    return this.deliveryNeighborhoodRepository.where({
      conditions: { deliverySettings, ...simpleFilters },
      conditionsLike: likeFilters,
    });
  }

  async deleteNeighborhood(id: string): Promise<void> {
    await this.deliveryNeighborhoodRepository.delete(id);
  }
}
