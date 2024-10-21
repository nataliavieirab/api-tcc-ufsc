import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { DefaultController } from 'src/modules/default.controller';
import { OrderService } from 'src/services/domains/order.service';
import { FindOrdersFilters } from './dtos/find-orders-filters';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { Order } from 'src/entities/order.entity';

@Controller('store/orders')
export class OrdersController extends DefaultController {
  constructor(private orderService: OrderService) {
    super();
  }

  module = 'store';

  @Get()
  async findAll(
    @Body() body: FindOrdersFilters,
  ): Promise<EntityPagination<Order>> {
    await this.validateAccess('findAllOrders');
    return this.orderService.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: any) {
    await this.validateAccess('findOrderById');
    const order = await this.orderService.findById(id);

    res.status(200).send(order);
  }
}
