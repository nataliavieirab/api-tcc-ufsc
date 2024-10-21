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

  async openDelivery(id: string): Promise<void> {
    await this.repository.update(id, { status: DeliveryStatus.OPEN });
  }

  async closeDelivery(id: string): Promise<void> {
    await this.repository.update(id, { status: DeliveryStatus.CLOSED });
  }

  async addNeighborhood(
    deliverySettingsId: string,
    neighborhood: {
      neighborhoodCode: string;
      neighborhoodName: string;
      deliveryFee: number;
    },
  ): Promise<void> {
    await this.deliveryNeighborhoodRepository.create({
      deliverySettingsId,
      ...neighborhood,
    });
  }

  async findAllNeighborhoods(
    deliverySettingsId: string,
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

    return this.deliveryNeighborhoodRepository.where({
      conditions: { deliverySettingsId, ...simpleFilters },
      conditionsLike: likeFilters,
    });
  }

  async deleteNeighborhood(id: string): Promise<void> {
    await this.deliveryNeighborhoodRepository.delete(id);
  }
}
