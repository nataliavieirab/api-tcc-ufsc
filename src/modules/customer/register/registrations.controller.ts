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

@Controller('admin/registrations')
export class RegistrationsController extends DefaultController {
  constructor(private customerService: CustomerService) {
    super();
  }

  @Post()
  async create(@Body() body: CreateRegisterBody, @Res() res: any) {
    this.validateAccess('createUser');

    const customer = await this.customerService.create(body);

    res.status(201).send({ ...customer, password: undefined });
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateRegisterBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    this.validateAccess('updateUser');
    const customer = await this.customerService.update(id, body);

    res.status(200).send({ ...customer, password: undefined });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: any) {
    this.validateAccess('deleteUser');
    await this.customerService.delete(id);

    res.status(204).send();
  }
}
