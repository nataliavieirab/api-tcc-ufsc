import { Store } from 'src/entities/store.entity';
import { ProductSetItem } from 'src/entities/product-set-item.entity';

export class CreateProductSetBody {
  store: Store;

  name: string;

  //   status: ProductSetStatus;

  items: ProductSetItem[];
}
