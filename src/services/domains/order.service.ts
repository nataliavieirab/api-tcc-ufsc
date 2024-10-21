import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/repositories/order.repository';
import { EntityDefaultService } from './entity-default.service';
import { Order } from 'src/entities/order.entity';
import { BagRepository } from 'src/repositories/bag.repository';
import { AddressRepository } from 'src/repositories/address.repository';
import { PaymentTypeRepository } from 'src/repositories/payment-type.repository';
import { ShippingRepository } from 'src/repositories/shipping.repository';
import { StoreService } from './store.service';
import { CurrentRequestService } from '../application/current-request.service';
import { ShippingStatus } from 'src/entities/shipping.entity';

interface OrderRequestInput {
  bagId: string;
  addressId: string;
  preferredPaymentTypeId?: string;
  observation?: string;
}

@Injectable()
export class OrderService extends EntityDefaultService<Order> {
  constructor(
    orderRepository: OrderRepository,
    private bagRepository: BagRepository,
    private addressRepository: AddressRepository,
    private paymentTypeRepository: PaymentTypeRepository,
    private shippingRepository: ShippingRepository,
    private storeService: StoreService,
    private currentRequestService: CurrentRequestService,
  ) {
    super(orderRepository);
  }

  async sendOrder(body: OrderRequestInput): Promise<Order> {
    const bag = await this.bagRepository.find(body.bagId);
    const paymentType = !body.preferredPaymentTypeId
      ? null
      : await this.paymentTypeRepository.find(body.preferredPaymentTypeId);

    const bagPrice = await bag.getTotal();

    const recipientAddress = await this.addressRepository.find(body.addressId);
    const deliveryFee = await this.storeService.getDeliveryFee(
      bag.store.id,
      recipientAddress.neighborhoodCode,
    );

    const order = await this.repository.create({
      bag,
      preferredPaymentType: paymentType,
      observation: body.observation,
      bagPrice,
      shippingPrice: deliveryFee,
      totalPrice: bagPrice + deliveryFee,
    });

    const customer = this.currentRequestService.getCurrentCustomer();

    const shipping = await this.shippingRepository.create({
      order,
      recipientAddress,
      price: deliveryFee,
      recipientName: customer.name,
      status: ShippingStatus.AWAITING,
    });
    order.shippings = [shipping];

    for (const bagItem of await bag.items) {
      await bagItem.update({ shipping: shipping });
    }

    return order;
  }
}
