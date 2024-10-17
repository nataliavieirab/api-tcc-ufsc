import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { DefaultController } from 'src/modules/default.controller';
import { OrderService } from 'src/services/domains/order.service';
import { FindOrdersFilters } from './dtos/find-orders-filters';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { Order } from 'src/entities/order.entity';
import { CreateOrderBody } from './dtos/create-order-body';
import { UpdateOrderBody } from './dtos/update-order-body';

@Controller('store/orders')
export class OrdersController extends DefaultController {
  constructor(private orderService: OrderService) {
    super();
  }

  @Get()
  async findAll(
    @Body() body: FindOrdersFilters,
  ): Promise<EntityPagination<Order>> {
    this.validateAccess('findAllOrders');
    return this.orderService.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: any) {
    this.validateAccess('findOrderById');
    const order = await this.orderService.findById(id);

    res.status(200).send(order);
  }

  @Post()
  async create(@Body() body: CreateOrderBody, @Res() res: any) {
    this.validateAccess('createOrder');

    const order = await this.orderService.create(body);

    res.status(201).send(order);
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateOrderBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    this.validateAccess('updateOrder');
    const order = await this.orderService.update(id, body);

    res.status(200).send(order);
  }
}
