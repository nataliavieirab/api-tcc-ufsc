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
import { CustomerService } from 'src/services/domains/customer.service';
import { UpdateRegisterBody } from './dtos/update-register-body';
import { CreateRegisterBody } from './dtos/create-register-body';
import { CreateAddressBody } from './dtos/create-address-body';
import { UpdateAddressBody } from './dtos/update-address-body';
import { IsPublic } from 'src/modules/auth/decorators/is-public.decorator';

@Controller('customer/accounts')
export class AccountsController {
  constructor(private customerService: CustomerService) {}

  @IsPublic()
  @Post()
  async create(@Body() body: CreateRegisterBody, @Res() res: any) {
    const customer = await this.customerService.create(body);

    res.status(201).send({ ...customer, password: undefined });
  }

  @Put()
  async update(@Body() body: UpdateRegisterBody, @Res() res: any) {
    const customer = await this.customerService.update(body);

    res.status(200).send({ ...customer, password: undefined });
  }

  @Delete()
  async delete(@Res() res: any) {
    await this.customerService.delete();

    res.status(204).send();
  }

  @Post('addresses')
  async createAddress(@Body() body: CreateAddressBody, @Res() res: any) {
    const address = await this.customerService.addAddress(body);

    res.status(201).send(address);
  }

  @Get('addresses')
  async listAddress(@Res() res: any) {
    const addresses = await this.customerService.getAddresses();

    res.status(200).send(addresses);
  }

  @Put('addresses/:id')
  async updateAddress(
    @Param('id') id: string,
    @Body() body: UpdateAddressBody,
    @Res() res: any,
  ) {
    const address = await this.customerService.updateAddress(id, body);

    res.status(201).send(address);
  }

  @Delete('addresses/:id')
  async deleteAddress(@Param('id') id: string, @Res() res: any) {
    await this.customerService.removeAddress(id);

    res.status(204).send();
  }
}
