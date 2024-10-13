import { Injectable } from '@nestjs/common';
import { DeliverySettingRepository } from 'src/repositories/delivery-setting.repository';
import { EntityDefaultService } from './entity-default.service';
import { DeliverySetting } from 'src/entities/delivery-setting.entity';

@Injectable()
export class DeliverySettingService extends EntityDefaultService<DeliverySetting> {
  constructor(deliverySettingRepository: DeliverySettingRepository) {
    super(deliverySettingRepository);
  }
}
