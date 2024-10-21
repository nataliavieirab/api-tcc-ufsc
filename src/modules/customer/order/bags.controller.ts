import { DefaultController } from 'src/modules/default.controller';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BagService } from 'src/services/domains/bag.service';
import { AddItemToBagBody } from './dtos/add-item-to-bag-body';

@Controller('stores/:storeId/bag')
export class OrdersController extends DefaultController {
  constructor(private bagService: BagService) {
    super();
  }

  @Get()
  async getCurrentBag(@Param('storeId') storeId: string, @Res() res: Response) {
    this.validateAccess('getCurrentBag');

    const bag = await this.bagService.getCurrentBag(storeId);

    res.status(200).send(bag);
  }

  @Post()
  async cleanBag(@Param('storeId') storeId: string, @Res() res: Response) {
    this.validateAccess('cleanBag');
    await this.bagService.cleanBag(storeId);

    res.status(204).send();
  }

  @Post('items')
  async addItem(
    @Param('storeId') storeId: string,
    @Body() body: AddItemToBagBody,
    @Res() res: Response,
  ) {
    this.validateAccess('addItemToBag');
    const bagItem = await this.bagService.addItem(storeId, body);

    res.status(200).send(bagItem);
  }

  @Delete('items/:bagItemId')
  async removeItem(
    @Param('storeId') storeId: string,
    @Param('bagItemId') bagItemId: string,
    @Res() res: Response,
  ) {
    this.validateAccess('removeItemFromBag');
    await this.bagService.removeItem(storeId, bagItemId);

    res.status(204).send();
  }
}
