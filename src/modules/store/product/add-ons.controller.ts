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
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { Response } from 'express';
import { UpdateUserBody } from '../user/dtos/update-user-body';
import { AddOnService } from 'src/services/domains/add-on.service';
import { FindAddOnsFilters } from './dtos/find-add-ons-filters';
import { AddOn } from 'src/entities/add-on.entity';
import { CreateAddOnBody } from './dtos/create-add-on-body';

@Controller('store/add-ons')
export class AddOnController extends DefaultController {
  constructor(private addOnService: AddOnService) {
    super();
  }

  module = 'store';

  @Get()
  async findAll(
    @Body() body: FindAddOnsFilters,
  ): Promise<EntityPagination<AddOn>> {
    await this.validateAccess('findAddOnsFilters');
    return this.addOnService.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess('findAddOnsById');
    const addOn = await this.addOnService.findById(id);

    res.status(200).send(addOn);
  }

  @Post()
  async create(@Body() body: CreateAddOnBody, @Res() res: Response) {
    await this.validateAccess('createAddOn');
    const addOn = await this.addOnService.create(body);

    res.status(201).send(addOn);
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateUserBody,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.validateAccess('updateAddOn');
    const addOn = await this.addOnService.update(id, body);

    res.status(200).send(addOn);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess('deleteAddOn');
    await this.addOnService.delete(id);

    res.status(204).send();
  }
}
