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

@Controller('companies/:companyId/bag')
export class OrdersController extends DefaultController {
  constructor(private bagService: BagService) {
    super();
  }

  @Get()
  async getCurrentBag(
    @Param('companyId') companyId: string,
    @Res() res: Response,
  ) {
    this.validateAccess('getCurrentBag');

    const bag = await this.bagService.getCurrentBag(companyId);

    res.status(200).send(bag);
  }

  @Post()
  async cleanBag(@Param('companyId') companyId: string, @Res() res: Response) {
    this.validateAccess('cleanBag');
    await this.bagService.cleanBag(companyId);

    res.status(204).send();
  }

  @Post('items')
  async addItem(
    @Param('companyId') companyId: string,
    @Body() body: AddItemToBagBody,
    @Res() res: Response,
  ) {
    this.validateAccess('addItemToBag');
    const bagItem = await this.bagService.addItem(companyId, body);

    res.status(200).send(bagItem);
  }

  @Delete('items/:bagItemId')
  async removeItem(
    @Param('companyId') companyId: string,
    @Param('bagItemId') bagItemId: string,
    @Res() res: Response,
  ) {
    this.validateAccess('removeItemFromBag');
    await this.bagService.removeItem(companyId, bagItemId);

    res.status(204).send();
  }
}
