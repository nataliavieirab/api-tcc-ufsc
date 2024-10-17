import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { DeliverySettings } from 'src/entities/delivery-settings.entity';
import { DefaultController } from 'src/modules/default.controller';
import { DeliverySettingsService } from 'src/services/domains/delivery-settings.service';
import { FindDeliverySettingsFilters } from './dtos/find-delivery-settings-filters';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { Response } from 'express';
import { UpdateDeliverySettingsBody } from './dtos/update-delivery-settings-body';
import { CreateNeighborhoodBody } from './dtos/create-neighborhood-body';
import { findAllNeighborhoodsFilters } from './dtos/find-neighborhoods-filters';
import { DeliveryNeighborhood } from 'src/entities/delivery-neighborhood.entity';

@Controller('store/delivery-settings')
export class DeliverySettingsController extends DefaultController {
  constructor(private deliverySettingsService: DeliverySettingsService) {
    super();
  }

  @Get()
  async findAll(
    @Body() body: FindDeliverySettingsFilters,
  ): Promise<EntityPagination<DeliverySettings>> {
    this.validateAccess('findAllDeliverySettings');
    return this.deliverySettingsService.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    this.validateAccess('findDeliverySettingsById');
    const deliverySettings = await this.deliverySettingsService.findById(id);

    res.status(200).send(deliverySettings);
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateDeliverySettingsBody,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    this.validateAccess('updateDeliverySettings');
    const deliverySettings = await this.deliverySettingsService.update(
      id,
      body,
    );

    res.status(200).send(deliverySettings);
  }

  @Patch('/:id')
  async openDelivery(@Param('id') id: string, @Res() res: Response) {
    this.validateAccess('openDelivery');
    await this.deliverySettingsService.openDelivery(id);

    res.status(200).send({ message: "Delivery's open!" });
  }

  @Patch('/:id')
  async closeDelivery(@Param('id') id: string, @Res() res: Response) {
    this.validateAccess('closeDelivery');
    await this.deliverySettingsService.closeDelivery(id);

    res.status(200).send({ message: "Delivery's closed." });
  }

  @Post()
  async createNeighborhood(
    @Body() body: CreateNeighborhoodBody,
    @Res() res: Response,
  ) {
    this.validateAccess('createNeighborhood');

    const neighborhood = await this.deliverySettingsService.createNeighborhood(
      body,
    );

    res.status(201).send(neighborhood);
  }

  @Get()
  async findAllNeighborhoods(
    @Body() body: findAllNeighborhoodsFilters,
  ): Promise<EntityPagination<DeliveryNeighborhood>> {
    this.validateAccess('findAllNeighborhoods');
    return this.deliverySettingsService.findAllNeighborhoods(body);
  }

  @Delete('/:id')
  async deleteNeighborhood(@Param('id') id: string, @Res() res: Response) {
    this.validateAccess('deleteNeighborhood');
    await this.deliverySettingsService.deleteNeighborhood(id);

    res.status(204).send({ message: 'Neighborhood deleted succesfully!' });
  }
}
