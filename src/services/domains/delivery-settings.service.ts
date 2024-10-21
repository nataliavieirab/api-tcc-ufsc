import { Injectable } from '@nestjs/common';
import { DeliverySettingsRepository } from 'src/repositories/delivery-settings.repository';
import { EntityDefaultService } from './entity-default.service';
import { DeliverySettings } from 'src/entities/delivery-settings.entity';

@Injectable()
export class DeliverySettingsService extends EntityDefaultService<DeliverySettings> {
  constructor(deliverySettingsRepository: DeliverySettingsRepository) {
    super(deliverySettingsRepository);
  }

  async openDelivery(id: string): Promise<void> {
    await this.findById(id);
  }

  async closeDelivery(id: string): Promise<void> {
    await this.findById(id);
  }
}
