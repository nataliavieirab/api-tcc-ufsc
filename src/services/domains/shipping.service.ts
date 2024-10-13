import { Injectable } from '@nestjs/common';
import { ShippingRepository } from 'src/repositories/shipping.repository';
import { EntityDefaultService } from './entity-default.service';
import { Shipping } from 'src/entities/shipping.entity';

@Injectable()
export class ShippingService extends EntityDefaultService<Shipping> {
  constructor(shippingRepository: ShippingRepository) {
    super(shippingRepository);
  }
}
