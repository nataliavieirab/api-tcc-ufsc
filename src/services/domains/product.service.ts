import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repositories/product.repository';
import { EntityDefaultService } from './entity-default.service';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductService extends EntityDefaultService<Product> {
  constructor(productRepository: ProductRepository) {
    super(productRepository);
  }
}
