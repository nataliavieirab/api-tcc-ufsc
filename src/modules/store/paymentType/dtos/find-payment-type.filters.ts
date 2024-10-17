import { Company } from 'src/entities/company.entity';
import { Payment } from 'src/entities/payment.entity';

export class FindPaymentTypeFilters {
  company: Company;

  name: string;

  // type: SystemPaymentType;

  payments: Payment[];
}
