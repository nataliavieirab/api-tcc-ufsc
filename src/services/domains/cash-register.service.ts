import { Injectable } from '@nestjs/common';
import { CashRegisterRepository } from 'src/repositories/cash-register.repository';
import { EntityDefaultService } from './entity-default.service';
import { CashRegister } from 'src/entities/cash-register.entity';

@Injectable()
export class CashRegisterService extends EntityDefaultService<CashRegister> {
  constructor(cashRegisterRepository: CashRegisterRepository) {
    super(cashRegisterRepository);
  }
}
