import { DefaultRepository } from './default.repository';
import { CashRegister } from 'src/entities/cash-register.entity';

export class CashRegisterRepository extends DefaultRepository<CashRegister> {
  constructor() {
    super(CashRegister);
  }
}
