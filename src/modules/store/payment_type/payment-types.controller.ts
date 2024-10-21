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
import { PaymentTypeService } from 'src/services/domains/payment-type.service';
import { FindPaymentTypeFilters } from './dtos/find-payment-type.filters';
import { PaymentType } from 'src/entities/payment-type.entity';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { Response } from 'express';
import { CreatePaymentTypeBody } from './dtos/create-payment-type-body';
import { UpdatePaymentTypeBody } from './dtos/update-payment-type-body';

@Controller('store/payment-types')
export class PaymentTypeController extends DefaultController {
  constructor(private paymentTypeService: PaymentTypeService) {
    super();
  }

  module = 'store';

  @Get()
  async findAll(
    @Body() body: FindPaymentTypeFilters,
  ): Promise<EntityPagination<PaymentType>> {
    await this.validateAccess('findAllPaymentTypes');
    return this.paymentTypeService.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess('findPaymentTypeById');
    const paymentType = await this.paymentTypeService.findById(id);

    res.status(200).send({ ...paymentType });
  }

  @Post()
  async create(@Body() body: CreatePaymentTypeBody, @Res() res: Response) {
    await this.validateAccess('createPaymentType');
    const paymentType = await this.paymentTypeService.create(body);

    res.status(201).send({ ...paymentType });
  }

  @Put('/:id')
  async update(
    @Body() body: UpdatePaymentTypeBody,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.validateAccess('updatePaymentType');
    const paymentType = await this.paymentTypeService.update(id, body);

    res.status(200).send({ ...paymentType });
  }

  @Delete('/:id')
  async delete(@Param() id: string, @Res() res: Response) {
    await this.validateAccess('deletePaymentType');
    await this.paymentTypeService.delete(id);

    res.status(204).send({ message: 'Payment type deleted successfully!!' });
  }
}
