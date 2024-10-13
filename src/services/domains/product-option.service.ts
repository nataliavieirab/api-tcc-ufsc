import { Injectable } from '@nestjs/common';
import { ProductOptionRepository } from 'src/repositories/product-option.repository';
import { EntityDefaultService } from './entity-default.service';
import { ProductOption } from 'src/entities/product-option.entity';

@Injectable()
export class ProductOptionService extends EntityDefaultService<ProductOption> {
  constructor(productOptionRepository: ProductOptionRepository) {
    super(productOptionRepository);
  }
}
