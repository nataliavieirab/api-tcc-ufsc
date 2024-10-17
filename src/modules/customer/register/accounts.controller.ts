import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { DefaultController } from 'src/modules/default.controller';
import { CustomerService } from 'src/services/domains/customer.service';
import { UpdateRegisterBody } from './dtos/update-register-body';
import { CreateRegisterBody } from './dtos/create-register-body';
import { CreateAddressBody } from './dtos/create-address-body';
import { UpdateAddressBody } from './dtos/update-address-body';

@Controller('admin/accounts')
export class AccountsController extends DefaultController {
  constructor(private customerService: CustomerService) {
    super();
  }

  @Post()
  async create(@Body() body: CreateRegisterBody, @Res() res: any) {
    this.validateAccess('createCustomerAccount');

    const customer = await this.customerService.create(body);

    res.status(201).send({ ...customer, password: undefined });
  }

  @Put()
  async update(@Body() body: UpdateRegisterBody, @Res() res: any) {
    this.validateAccess('updateCustomerAccount');
    const customer = await this.customerService.update(body);

    res.status(200).send({ ...customer, password: undefined });
  }

  @Delete()
  async delete(@Res() res: any) {
    this.validateAccess('deleteUser');
    await this.customerService.delete();

    res.status(204).send();
  }

  @Post('addresses')
  async createAddress(@Body() body: CreateAddressBody, @Res() res: any) {
    this.validateAccess('createCustomerAddress');

    const address = await this.customerService.addAddress(body);

    res.status(201).send(address);
  }

  @Put('addresses/:id')
  async updateAddress(
    @Param('id') id: string,
    @Body() body: UpdateAddressBody,
    @Res() res: any,
  ) {
    this.validateAccess('updateCustomerAddress');

    const address = await this.customerService.updateAddress(id, body);

    res.status(201).send(address);
  }

  @Delete('addresses/:id')
  async deleteAddress(@Param('id') id: string, @Res() res: any) {
    this.validateAccess('deleteCustomerAddress');

    await this.customerService.removeAddress(id);

    res.status(201).send();
  }
}
