import { Store } from 'src/entities/store.entity';
import { DeliveryStatus } from 'src/entities/delivery-settings.entity';

export class CreateDeliverySettingsBody {
  store: Store;

  start_hour: string;

  end_hour: string;

  type: DeliveryStatus;
}
