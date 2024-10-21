import { Store } from 'src/entities/store.entity';
import { Payment } from 'src/entities/payment.entity';

export class CreatePaymentTypeBody {
  store: Store;

  name: string;

  // type: SystemPaymentType;

  payments: Payment[];
}
