import { DefaultRepository } from './default.repository';
import { Order } from 'src/entities/order.entity';

export class OrderRepository extends DefaultRepository<Order> {
  constructor() {
    super(Order);
  }
}
