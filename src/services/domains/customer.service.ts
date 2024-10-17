import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/repositories/customer.repository';
import { EntityDefaultService } from './entity-default.service';
import { Customer } from 'src/entities/customer.entity';
import { BagRepository } from 'src/repositories/bag.repository';
import { AddressRepository } from 'src/repositories/address.repository';
import { Address } from 'src/entities/address.entity';
import { CustomerAddressRepository } from 'src/repositories/customer-address.repository';
import { CurrentRequestService } from '../application/current-request.service';
import { CustomerAddress } from 'src/entities/customer-address.entity';
import { EntityPagination } from 'src/utils/entity-pagination.type';

@Injectable()
export class CustomerService extends EntityDefaultService<Customer> {
  constructor(
    customerRepository: CustomerRepository,
    private bagRepository: BagRepository,
    private addressRepository: AddressRepository,
    private customerAddressRepository: CustomerAddressRepository,
    private currentRequestService: CurrentRequestService,
  ) {
    super(customerRepository);
  }

  async create(input: {
    name: string;
    email: string;
    password: string;
  }): Promise<Customer> {
    input.password = await bcrypt.hash(input.password, 10);

    const createdCustomer = await this.repository.create(input);

    await this.bagRepository.create({
      customer: createdCustomer,
    });

    return createdCustomer;
  }

  async update(
    id: string,
    input: {
      name?: string;
      email?: string;
      password?: string;
    },
  ): Promise<Customer> {
    if (input.password) input.password = await bcrypt.hash(input.password, 10);

    const createdCustomer = await this.repository.update(id, input);

    return createdCustomer;
  }

  async addAddress(adreessAttributes: Address): Promise<Address> {
    const address = await this.addressRepository.create(adreessAttributes);

    const customer = this.currentRequestService.getCurrentCustomer();

    await this.customerAddressRepository.create({
      customer,
      address,
    });

    return address;
  }

  async updateAddress(
    addressId: string,
    adreessAttributes: Address,
  ): Promise<Address> {
    const address = await this.addressRepository.update(
      addressId,
      adreessAttributes,
    );

    return address;
  }

  async removeAddress(addressId: string): Promise<void> {
    const customerAddress = await this.customerAddressRepository.findOne({
      conditions: {
        addressId,
      },
    });

    if (!customerAddress) return;

    await this.customerAddressRepository.delete(customerAddress.id);
  }

  async getAddresses(): Promise<EntityPagination<CustomerAddress>> {
    const customer = this.currentRequestService.getCurrentCustomer();

    const customerAddresses = await this.customerAddressRepository.where({
      conditions: {
        customerId: customer.id,
      },
    });

    return customerAddresses;
  }
}
