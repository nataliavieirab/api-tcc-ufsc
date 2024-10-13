import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/repositories/order.repository';
import { EntityDefaultService } from './entity-default.service';
import { Order } from 'src/entities/order.entity';

@Injectable()
export class OrderService extends EntityDefaultService<Order> {
  constructor(orderRepository: OrderRepository) {
    super(orderRepository);
  }
}
