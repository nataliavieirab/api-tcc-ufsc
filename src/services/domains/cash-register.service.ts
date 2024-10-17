import { Injectable } from '@nestjs/common';
import { CashRegisterRepository } from 'src/repositories/cash-register.repository';
import { EntityDefaultService } from './entity-default.service';
import { CashRegister } from 'src/entities/cash-register.entity';
import { CurrentRequestService } from '../application/current-request.service';
import { CompanyService } from './company.service';

export interface CreateCashRegisterInput {
  companyId: string;
  openingDate?: Date;
  closingDate?: Date;
}

@Injectable()
export class CashRegisterService extends EntityDefaultService<CashRegister> {
  constructor(
    cashRegisterRepository: CashRegisterRepository,
    private readonly companyService: CompanyService,
    private readonly currentRequestService: CurrentRequestService,
  ) {
    super(cashRegisterRepository);
  }

  async create(createInput: CreateCashRegisterInput): Promise<CashRegister> {
    const company = await this.companyService.findById(createInput.companyId);
    const responsibleUser = this.currentRequestService.getCurrentUser();

    return await this.repository.create({
      company,
      responsibleUser,
      openingDate: createInput.openingDate || new Date(),
      closingDate: createInput.closingDate,
    });
  }
}
