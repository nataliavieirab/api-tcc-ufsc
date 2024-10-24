import { Body, Controller, Get, Param, Patch, Res } from '@nestjs/common';
import { DefaultController } from 'src/modules/default.controller';
import { OrderService } from 'src/services/domains/order.service';
import { FindOrdersFilters } from './dtos/find-orders-filters';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { Order } from 'src/entities/order.entity';
import { AcceptOrderBody } from './dtos/accept-order-body';
import { RefuseOrderBody } from './dtos/refuse-order-body';
import { FinishOrderBody } from './dtos/finish-order-body';
import { Actions } from 'src/services/permissions/permissions';

@Controller('store/:storeId/orders')
export class OrdersController extends DefaultController {
  constructor(private orderService: OrderService) {
    super();
  }

  module = 'store';

  @Get()
  async findAll(
    @Body() body: FindOrdersFilters,
  ): Promise<EntityPagination<Order>> {
    await this.validateAccess(Actions.findOrders);
    return this.orderService.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: any) {
    await this.validateAccess(Actions.findOrders);
    const order = await this.orderService.findById(id);

    res.status(200).send(order);
  }

  @Patch('/:id/accept')
  async acceptOrder(
    @Param('id') id: string,
    @Res() res: any,
    @Body() body: AcceptOrderBody,
  ) {
    await this.validateAccess(Actions.acceptOrder);
    const order = await this.orderService.acceptOrder(id, body.cashRegisterId);

    res.status(200).send(order);
  }

  @Patch('/:id/refuse')
  async refuseOrder(
    @Param('id') id: string,
    @Res() res: any,
    @Body() body: RefuseOrderBody,
  ) {
    await this.validateAccess(Actions.refuseOrder);
    const order = await this.orderService.refuseOrder(id, body.cashRegisterId);

    res.status(200).send(order);
  }

  @Patch('/:id/shipping')
  async setOrderAsShipping(@Param('id') id: string, @Res() res: any) {
    await this.validateAccess(Actions.setOrderAsShipping);
    const order = await this.orderService.setOrderAsShipping(id);

    res.status(200).send(order);
  }

  @Patch('/:id/finish')
  async finishOrder(
    @Param('id') id: string,
    @Res() res: any,
    @Body() body: FinishOrderBody,
  ) {
    await this.validateAccess(Actions.finishOrder);
    const order = await this.orderService.finishOrder(id, body.payments);

    res.status(200).send(order);
  }
}
