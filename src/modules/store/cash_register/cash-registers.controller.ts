import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { DefaultController } from 'src/modules/default.controller';
import { CashRegisterService } from 'src/services/domains/cash-register.service';
import { FindCashRegistersFilters } from './dtos/find-cash-registers-filters';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { CashRegister } from 'src/entities/cash-register.entity';
import { UpdateCashRegisterBody } from './dtos/update-cash-register-body';
import { CreateCashRegisterBody } from './dtos/create-cash-register-body';
import { Response } from 'express';
import { Actions } from 'src/services/permissions/permissions';

@Controller('store/:storeId/cash-registers')
export class CashRegistersController extends DefaultController {
  constructor(private cashRegisterService: CashRegisterService) {
    super();
  }

  module = 'store';

  @Get()
  async findAll(
    @Body() body: FindCashRegistersFilters,
    @Param('storeId') storeId: string,
  ): Promise<EntityPagination<CashRegister>> {
    await this.validateAccess(Actions.findCashRegisters);
    return this.cashRegisterService.findAll({ storeId, ...body });
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess(Actions.findCashRegisters);
    const cashRegister = await this.cashRegisterService.findById(id);

    res.status(200).send(cashRegister);
  }

  @Post()
  async create(
    @Param('storeId') storeId: string,
    @Body() body: CreateCashRegisterBody,
    @Res() res: Response,
  ) {
    await this.validateAccess(Actions.createCashRegister);
    const cashRegister = await this.cashRegisterService.create({
      storeId,
      ...body,
    });
    res.status(201).send(cashRegister);
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateCashRegisterBody,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.validateAccess(Actions.updateCashRegister);
    const cashRegister = await this.cashRegisterService.update(id, body);

    res.status(200).send(cashRegister);
  }
}
