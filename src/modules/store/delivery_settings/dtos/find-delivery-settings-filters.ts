import { Store } from 'src/entities/store.entity';
import { DeliveryStatus } from 'src/entities/delivery-settings.entity';

export class FindDeliverySettingsFilters {
  store: Store;

  start_hour: string;

  end_hour: string;

  type: DeliveryStatus;
}
