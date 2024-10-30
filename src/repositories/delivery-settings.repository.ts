import { DefaultRepository } from './default.repository';
import { DeliverySettings } from 'src/entities/delivery-settings.entity';

export class DeliverySettingsRepository extends DefaultRepository<DeliverySettings> {
  constructor() {
    super(DeliverySettings);
  }

  accessibilityQuery(store) {
    return { store };
  }
}
