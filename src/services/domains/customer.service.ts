import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/repositories/customer.repository';
import { EntityDefaultService } from './entity-default.service';
import { Customer } from 'src/entities/customer.entity';
import { BagRepository } from 'src/repositories/bag.repository';

@Injectable()
export class CustomerService extends EntityDefaultService<Customer> {
  constructor(
    customerRepository: CustomerRepository,
    private bagRepository: BagRepository,
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
}
