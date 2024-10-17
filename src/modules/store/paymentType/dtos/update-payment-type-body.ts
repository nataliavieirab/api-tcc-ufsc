import { Payment } from 'src/entities/payment.entity';

export class UpdatePaymentTypeBody {
  name: string;

  // type: SystemPaymentType;

  payments: Payment[];
}
