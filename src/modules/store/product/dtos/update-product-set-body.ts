import { ProductSetItem } from 'src/entities/product-set-item.entity';

export class UpdateProductSetBody {
  name: string;

  //   status: ProductSetStatus;

  items: ProductSetItem[];
}
