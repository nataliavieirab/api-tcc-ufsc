import { Injectable } from '@nestjs/common';
import { DeliverySettingRepository } from 'src/repositories/delivery-setting.repository';
import { EntityDefaultService } from './entity-default.service';
import { DeliverySettings } from 'src/entities/delivery-settings.entity';

@Injectable()
export class DeliverySettingsService extends EntityDefaultService<DeliverySettings> {
  constructor(deliverySettingRepository: DeliverySettingRepository) {
    super(deliverySettingRepository);
  }

  async openDelivery(id: string): Promise<void> {
    await this.findById(id);
  }

  async closeDelivery(id: string): Promise<void> {
    await this.findById(id);
  }
}
