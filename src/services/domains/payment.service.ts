import { Injectable } from '@nestjs/common';
import { PaymentRepository } from 'src/repositories/payment.repository';
import { EntityDefaultService } from './entity-default.service';
import { Payment } from 'src/entities/payment.entity';

@Injectable()
export class PaymentService extends EntityDefaultService<Payment> {
  constructor(paymentRepository: PaymentRepository) {
    super(paymentRepository);
  }
}
