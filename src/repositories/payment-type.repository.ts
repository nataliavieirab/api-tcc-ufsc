import { DefaultRepository } from './default.repository';
import { PaymentType } from 'src/entities/payment-type.entity';

export class PaymentTypeRepository extends DefaultRepository<PaymentType> {
  constructor() {
    super(PaymentType);
  }

  accessibilityQuery(store) {
    return { store };
  }
}
