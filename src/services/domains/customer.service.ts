import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/repositories/customer.repository';
import { Customer } from 'src/entities/customer.entity';
import { AddressRepository } from 'src/repositories/address.repository';
import { Address } from 'src/entities/address.entity';
import { CustomerAddressRepository } from 'src/repositories/customer-address.repository';
import { CurrentRequestService } from '../application/current-request.service';
import { CustomerAddress } from 'src/entities/customer-address.entity';
import { EntityPagination } from 'src/utils/entity-pagination.type';

interface AddressAttributes {
  street: string;
  number: string;
  complement: string;
  zipCode: string;
  neighborhoodCode: string;
}
@Injectable()
export class CustomerService {
  constructor(
    private repository: CustomerRepository,
    private addressRepository: AddressRepository,
    private customerAddressRepository: CustomerAddressRepository,
    private currentRequestService: CurrentRequestService,
  ) {}

  async findById(id: string) {
    return await this.repository.findOne({ conditions: { id } });
  }

  async create(input: {
    name: string;
    email: string;
    password: string;
  }): Promise<Customer> {
    input.password = await bcrypt.hash(input.password, 10);

    const createdCustomer = await this.repository.create(input);

    return createdCustomer;
  }

  async update(input: {
    name?: string;
    email?: string;
    password?: string;
  }): Promise<Customer> {
    if (input.password) input.password = await bcrypt.hash(input.password, 10);

    const customer = this.currentRequestService.getCurrentCustomer();

    const createdCustomer = await this.repository.update(customer.id, input);

    return createdCustomer;
  }

  async delete(): Promise<void> {
    const customer = this.currentRequestService.getCurrentCustomer();

    return await this.repository.delete(customer.id);
  }

  async addAddress(adreessAttributes: AddressAttributes): Promise<Address> {
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
    adreessAttributes: Partial<AddressAttributes>,
  ): Promise<Address> {
    const address = await this.addressRepository.update(
      addressId,
      adreessAttributes,
    );

    return address;
  }

  async removeAddress(addressId: string): Promise<void> {
    const customer = this.currentRequestService.getCurrentCustomer();

    const customerAddress = await this.customerAddressRepository.findOne({
      conditions: {
        address: { id: addressId },
        customer: customer,
      },
    });

    if (!customerAddress) return;

    await this.customerAddressRepository.delete(customerAddress.id);
  }

  async getAddresses() {
    const customer = this.currentRequestService.getCurrentCustomer();

    const customerAddresses = await this.customerAddressRepository.where({
      conditions: {
        customerId: customer.id,
      },
      relations: ['address'],
    });

    const addresses = customerAddresses.content.map(
      (customerAddress) => customerAddress.address,
    );

    return { ...customerAddresses, content: addresses };
  }
}
