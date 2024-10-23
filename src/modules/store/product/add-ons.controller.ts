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
import { AddOnService } from 'src/services/domains/add-on.service';
import { FindAddOnsFilters } from './dtos/find-add-ons-filters';
import { AddOn } from 'src/entities/add-on.entity';
import { CreateAddOnBody } from './dtos/create-add-on-body';
import { UpdateAddOnBody } from './dtos/update-add-on-body';
import { Actions } from 'src/services/permissions/permissions';

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
    await this.validateAccess(Actions.findAddOns);
    return this.addOnService.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess(Actions.findAddOns);
    const addOn = await this.addOnService.findById(id);

    res.status(200).send(addOn);
  }

  @Post()
  async create(@Body() body: CreateAddOnBody, @Res() res: Response) {
    await this.validateAccess(Actions.createAddOn);
    const addOn = await this.addOnService.create(body);

    res.status(201).send(addOn);
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateAddOnBody,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.validateAccess(Actions.updateAddOn);
    const addOn = await this.addOnService.update(id, body);

    res.status(200).send(addOn);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess(Actions.deleteAddOn);
    await this.addOnService.delete(id);

    res.status(204).send();
  }
}
