import { Address } from 'src/entities/address.entity';
import { Bag } from 'src/entities/bag.entity';

export class SendOrderBody {
  bagId: Bag;
  addressId: Address;
}
