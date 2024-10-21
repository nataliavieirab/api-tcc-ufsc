import { Injectable } from '@nestjs/common';
import { CashRegisterRepository } from 'src/repositories/cash-register.repository';
import { EntityDefaultService } from './entity-default.service';
import { CashRegister } from 'src/entities/cash-register.entity';
import { CurrentRequestService } from '../application/current-request.service';
import { StoreService } from './store.service';

export interface CreateCashRegisterInput {
  storeId: string;
  openingDate?: Date;
  closingDate?: Date;
}

@Injectable()
export class CashRegisterService extends EntityDefaultService<CashRegister> {
  constructor(
    cashRegisterRepository: CashRegisterRepository,
    private readonly storeService: StoreService,
    private readonly currentRequestService: CurrentRequestService,
  ) {
    super(cashRegisterRepository);
  }

  async create(createInput: CreateCashRegisterInput): Promise<CashRegister> {
    const store = await this.storeService.findById(createInput.storeId);
    const responsibleUser = this.currentRequestService.getCurrentUser();

    return await this.repository.create({
      store,
      responsibleUser,
      openingDate: createInput.openingDate || new Date(),
      closingDate: createInput.closingDate,
    });
  }
}
