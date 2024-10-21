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
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { Response } from 'express';
import { UpdateDeliverySettingsBody } from './dtos/update-delivery-settings-body';
import { findAllNeighborhoodsFilters } from './dtos/find-neighborhoods-filters';
import { DeliveryNeighborhood } from 'src/entities/delivery-neighborhood.entity';
import { AddNeighborhoodBody } from './dtos/add-neighborhood-body';

@Controller('store/:storeId/delivery-settings')
export class DeliverySettingsController extends DefaultController {
  constructor(private deliverySettingsService: DeliverySettingsService) {
    super();
  }

  module = 'store';

  @Get()
  async findAll(
    @Param('storeId') storeId: string,
  ): Promise<EntityPagination<DeliverySettings>> {
    await this.validateAccess('findAllDeliverySettings');
    return this.deliverySettingsService.findAll({ storeId });
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess('findDeliverySettingsById');
    const deliverySettings = await this.deliverySettingsService.findById(id);

    res.status(200).send(deliverySettings);
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateDeliverySettingsBody,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.validateAccess('updateDeliverySettings');
    const deliverySettings = await this.deliverySettingsService.update(
      id,
      body,
    );

    res.status(200).send(deliverySettings);
  }

  @Patch('/:id')
  async openDelivery(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess('openDelivery');
    await this.deliverySettingsService.openDelivery(id);

    res.status(200).send();
  }

  @Patch('/:id')
  async closeDelivery(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess('closeDelivery');
    await this.deliverySettingsService.closeDelivery(id);

    res.status(200).send();
  }

  @Post('/:id/neighborhoods')
  async addNeighborhood(
    @Param('id') deliverySettingsId: string,
    @Body() body: AddNeighborhoodBody,
    @Res() res: Response,
  ) {
    await this.validateAccess('createNeighborhood');

    const neighborhood = await this.deliverySettingsService.addNeighborhood(
      deliverySettingsId,
      body,
    );

    res.status(201).send(neighborhood);
  }

  @Get('/:id/neighborhoods')
  async findAllNeighborhoods(
    @Param('id') deliverySettingsId: string,
    @Body() body: findAllNeighborhoodsFilters,
  ): Promise<EntityPagination<DeliveryNeighborhood>> {
    await this.validateAccess('findAllNeighborhoods');
    return this.deliverySettingsService.findAllNeighborhoods(
      deliverySettingsId,
      body,
    );
  }

  @Delete('/:id/neighborhoods/:neighborhoodId')
  async deleteNeighborhood(
    @Param('neighborhoodId') neighborhoodId: string,
    @Res() res: Response,
  ) {
    await this.validateAccess('deleteNeighborhood');
    await this.deliverySettingsService.deleteNeighborhood(neighborhoodId);

    res.status(204).send();
  }
}
