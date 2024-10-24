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
import { DefaultController } from 'src/modules/default.controller';
import { DeliverySettingsService } from 'src/services/domains/delivery-settings.service';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { Response } from 'express';
import { UpdateDeliverySettingsBody } from './dtos/update-delivery-settings-body';
import { findAllNeighborhoodsFilters } from './dtos/find-neighborhoods-filters';
import { DeliveryNeighborhood } from 'src/entities/delivery-neighborhood.entity';
import { AddNeighborhoodBody } from './dtos/add-neighborhood-body';
import { Actions } from 'src/services/permissions/permissions';

@Controller('store/:storeId/delivery-settings')
export class DeliverySettingsController extends DefaultController {
  constructor(private deliverySettingsService: DeliverySettingsService) {
    super();
  }

  module = 'store';

  @Get()
  async findByStore(@Param('storeId') storeId: string, @Res() res: Response) {
    await this.validateAccess(Actions.findDeliverySettings);
    const deliverySettings = await this.deliverySettingsService.findByStore(
      storeId,
    );

    res.status(200).send(deliverySettings);
  }

  @Put()
  async update(
    @Param('storeId') storeId: string,
    @Body() body: UpdateDeliverySettingsBody,
    @Res() res: Response,
  ) {
    await this.validateAccess(Actions.updateDeliverySettings);

    const deliverySettings = await this.deliverySettingsService.findByStore(
      storeId,
    );

    const updatedDeliverySettings = await this.deliverySettingsService.update(
      deliverySettings.id,
      body,
    );

    res.status(200).send(updatedDeliverySettings);
  }

  @Patch('/open')
  async openDelivery(@Param('storeId') storeId: string, @Res() res: Response) {
    await this.validateAccess(Actions.openDelivery);

    await this.deliverySettingsService.openDelivery(storeId);

    res.status(200).send();
  }

  @Patch('/close')
  async closeDelivery(@Param('storeId') storeId: string, @Res() res: Response) {
    await this.validateAccess(Actions.closeDelivery);

    await this.deliverySettingsService.closeDelivery(storeId);

    res.status(200).send();
  }

  @Post('/neighborhoods')
  async addNeighborhood(
    @Param('storeId') storeId: string,
    @Body() body: AddNeighborhoodBody,
    @Res() res: Response,
  ) {
    await this.validateAccess(Actions.addNeighborhood);

    const neighborhood = await this.deliverySettingsService.addNeighborhood(
      storeId,
      body,
    );

    res.status(201).send(neighborhood);
  }

  @Get('/neighborhoods')
  async findAllNeighborhoods(
    @Param('storeId') storeId: string,
    @Body() body: findAllNeighborhoodsFilters,
  ): Promise<EntityPagination<DeliveryNeighborhood>> {
    await this.validateAccess(Actions.findNeighborhoods);

    return await this.deliverySettingsService.findAllNeighborhoods(
      storeId,
      body,
    );
  }

  @Delete('/neighborhoods/:neighborhoodId')
  async deleteNeighborhood(
    @Param('neighborhoodId') neighborhoodId: string,
    @Res() res: Response,
  ) {
    await this.validateAccess(Actions.deleteNeighborhood);

    await this.deliverySettingsService.deleteNeighborhood(neighborhoodId);

    res.status(204).send();
  }
}
