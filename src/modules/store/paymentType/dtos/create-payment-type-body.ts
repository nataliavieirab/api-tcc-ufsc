import { Company } from 'src/entities/company.entity';
import { Payment } from 'src/entities/payment.entity';

export class CreatePaymentTypeBody {
  company: Company;

  name: string;

  // type: SystemPaymentType;

  payments: Payment[];
}
