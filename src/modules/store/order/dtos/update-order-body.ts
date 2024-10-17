import { Bag } from 'src/entities/bag.entity';
import { CashRegister } from 'src/entities/cash-register.entity';
import { Payment } from 'src/entities/payment.entity';

export class UpdateOrderBody {
  bag: Bag;

  cashRegister: CashRegister;

  payments: Payment[];
}
