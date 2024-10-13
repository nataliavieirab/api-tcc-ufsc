import { Injectable } from '@nestjs/common';
import { PaymentTypeRepository } from 'src/repositories/payment-type.repository';
import { EntityDefaultService } from './entity-default.service';
import { PaymentType } from 'src/entities/payment-type.entity';

@Injectable()
export class PaymentTypeService extends EntityDefaultService<PaymentType> {
  constructor(paymentTypeRepository: PaymentTypeRepository) {
    super(paymentTypeRepository);
  }
}
