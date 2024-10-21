import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { OrderService } from 'src/services/domains/order.service';
import { FindOrdersFilters } from './dtos/find-orders-filters';
import { Order } from 'src/entities/order.entity';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { Response } from 'express';
import { SendOrderBody } from './dtos/send-order-body';

@Controller('customer/orders')
export class OrdersController {
  constructor(private orderService: OrderService) {}

  module = 'store';

  @Get()
  async findAllOrders(
    @Body() body: FindOrdersFilters,
  ): Promise<EntityPagination<Order>> {
    return this.orderService.findAll(body);
  }

  @Get('/:id')
  async findOrderById(@Param('id') id: string, @Res() res: Response) {
    const order = await this.orderService.findById(id);

    res.status(200).send(order);
  }

  @Post()
  async sendOrder(@Body() body: SendOrderBody, @Res() res: Response) {
    const order = await this.orderService.sendOrder(body);

    res.status(201).send(order);
  }
}
