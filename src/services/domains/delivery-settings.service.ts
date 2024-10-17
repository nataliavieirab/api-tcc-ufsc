import { Injectable } from '@nestjs/common';
import { DeliverySettingRepository } from 'src/repositories/delivery-setting.repository';
import { EntityDefaultService } from './entity-default.service';
import { DeliverySettings } from 'src/entities/delivery-settings.entity';

@Injectable()
export class DeliverySettingsService extends EntityDefaultService<DeliverySettings> {
  constructor(deliverySettingRepository: DeliverySettingRepository) {
    super(deliverySettingRepository);
  }
}
