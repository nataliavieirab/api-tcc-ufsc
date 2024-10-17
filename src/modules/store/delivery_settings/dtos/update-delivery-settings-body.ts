import { DeliveryStatus } from 'src/entities/delivery-settings.entity';

export class UpdateDeliverySettingsBody {
  start_hour: string;

  end_hour: string;

  type: DeliveryStatus;
}
