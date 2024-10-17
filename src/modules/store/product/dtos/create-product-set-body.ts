import { Company } from 'src/entities/company.entity';
import { ProductSetItem } from 'src/entities/product-set-item.entity';

export class CreateProductSetBody {
  company: Company;

  name: string;

  //   status: ProductSetStatus;

  items: ProductSetItem[];
}
