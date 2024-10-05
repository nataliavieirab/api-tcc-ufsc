import { DefaultRepository } from './default.repository';
import { Customer } from 'src/entities/customer.entity';

export class CustomerRepository extends DefaultRepository<Customer> {}
