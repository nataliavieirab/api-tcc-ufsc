import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/repositories/order.repository';
import { EntityDefaultService } from './entity-default.service';
import { Order, OrderStatus } from 'src/entities/order.entity';
import { BagRepository } from 'src/repositories/bag.repository';
import { AddressRepository } from 'src/repositories/address.repository';
import { PaymentTypeRepository } from 'src/repositories/payment-type.repository';
import { ShippingRepository } from 'src/repositories/shipping.repository';
import { StoreService } from './store.service';
import { CurrentRequestService } from '../application/current-request.service';
import { ShippingStatus } from 'src/entities/shipping.entity';
import { BagStatus } from 'src/entities/bag.entity';
import { CashRegisterRepository } from 'src/repositories/cash-register.repository';
import { PaymentRepository } from 'src/repositories/payment.repository';

interface OrderRequestInput {
  storeId: string;
  addressId: string;
  preferredPaymentTypeId?: string;
  observation?: string;
}

interface OrderPaymentInput {
  paymentTypeId: string;
  value: number;
}

@Injectable()
export class OrderService extends EntityDefaultService<Order> {
  constructor(
    orderRepository: OrderRepository,
    private bagRepository: BagRepository,
    private addressRepository: AddressRepository,
    private paymentTypeRepository: PaymentTypeRepository,
    private shippingRepository: ShippingRepository,
    private cashRegisterRepository: CashRegisterRepository,
    private storeService: StoreService,
    private currentRequestService: CurrentRequestService,
    private paymentRepository: PaymentRepository,
  ) {
    super(orderRepository);
  }

  async findOrdersByStoreId(
    storeId: string,
    filters: {
      before_date?: Date;
      after_date?: Date;
      status?: OrderStatus;
    },
  ) {
    const customer = this.currentRequestService.getCurrentCustomer();

    const bags = this.bagRepository.getQueryFor({
      conditions: {
        storeId,
        customer,
      },
    });

    const { simpleFilters, afterFilters, beforeFilters } =
      await this.transformDecoratedFilters(filters);

    return await this.repository.where({
      conditions: simpleFilters,
      conditionsAfter: afterFilters,
      conditionsBefore: beforeFilters,
      joins: {
        bag: bags,
      },
      relations: ['payments', 'shippings'],
    });
  }

  async sendOrder(body: OrderRequestInput): Promise<Order> {
    const customer = this.currentRequestService.getCurrentCustomer();

    const bag = await this.bagRepository.findOne({
      conditions: {
        storeId: body.storeId,
        customer,
        status: BagStatus.OPENED,
      },
    });

    const paymentType = !body.preferredPaymentTypeId
      ? null
      : await this.paymentTypeRepository.find(body.preferredPaymentTypeId);

    const bagPrice = await bag.getTotal();

    const recipientAddress = await this.addressRepository.find(body.addressId);
    const deliveryFee = await this.storeService.getDeliveryFee(
      body.storeId,
      recipientAddress.neighborhoodCode,
    );

    const order = await this.repository.create({
      bag,
      date: new Date(),
      preferredPaymentType: paymentType,
      observation: body.observation,
      bagPrice,
      shippingPrice: deliveryFee,
      totalPrice: bagPrice + deliveryFee,
    });

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

    await bag.update({ status: BagStatus.ORDERED });

    return order;
  }

  async acceptOrder(orderId: string, cashRegisterId: string): Promise<Order> {
    const order = await this.repository.find(orderId);
    const cashRegister = await this.cashRegisterRepository.find(cashRegisterId);

    await order.update({ cashRegister, status: OrderStatus.ACCEPTED });

    return order;
  }

  async refuseOrder(orderId: string, cashRegisterId: string): Promise<Order> {
    const order = await this.repository.find(orderId);
    const cashRegister = await this.cashRegisterRepository.find(cashRegisterId);

    await order.update({ cashRegister, status: OrderStatus.REFUSED });

    return order;
  }

  async setOrderAsShipping(orderId: string): Promise<Order> {
    const order = await this.repository.find(orderId);

    await order.update({ status: OrderStatus.SHIPPING });

    const shipping = await this.shippingRepository.findOne({
      conditions: {
        order,
      },
    });

    await shipping.update({ status: ShippingStatus.IN_PROGRESS });

    return order;
  }

  async finishOrder(
    orderId: string,
    payments: OrderPaymentInput[],
  ): Promise<Order> {
    const order = await this.repository.find(orderId);

    const createdPayments = [];
    for (const payment of payments) {
      const paymentType = await this.paymentTypeRepository.find(
        payment.paymentTypeId,
      );

      createdPayments.push(
        await this.paymentRepository.create({
          order,
          ...payment,
          paymentType,
        }),
      );
    }

    await order.update({ status: OrderStatus.FINISHED });
    order.payments = createdPayments;

    const shipping = await this.shippingRepository.findOne({
      conditions: {
        order,
      },
    });

    await shipping.update({ status: ShippingStatus.FINISHED });
    order.shippings = [shipping];

    return order;
  }
}
