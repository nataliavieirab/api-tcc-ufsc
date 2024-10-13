import { Injectable } from '@nestjs/common';
import { ProductSetRepository } from 'src/repositories/product-set.repository';
import { EntityDefaultService } from './entity-default.service';
import { ProductSet } from 'src/entities/product-set.entity';

@Injectable()
export class ProductSetService extends EntityDefaultService<ProductSet> {
  constructor(productSetRepository: ProductSetRepository) {
    super(productSetRepository);
  }
}
