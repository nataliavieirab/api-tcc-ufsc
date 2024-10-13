import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/repositories/customer.repository';
import { EntityDefaultService } from './entity-default.service';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomerService extends EntityDefaultService<Customer> {
  constructor(customerRepository: CustomerRepository) {
    super(customerRepository);
  }
}
