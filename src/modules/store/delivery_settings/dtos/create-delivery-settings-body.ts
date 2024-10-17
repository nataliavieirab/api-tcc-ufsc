import { Company } from 'src/entities/company.entity';
import { DeliveryStatus } from 'src/entities/delivery-settings.entity';

export class CreateDeliverySettingsBody {
  company: Company;

  start_hour: string;

  end_hour: string;

  type: DeliveryStatus;
}
