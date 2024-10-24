import { Injectable } from '@nestjs/common';
import { ProductSetRepository } from 'src/repositories/product-set.repository';
import { EntityDefaultService } from './entity-default.service';
import { ProductSet } from 'src/entities/product-set.entity';
import { ProductSetItemRepository } from 'src/repositories/product-set-item.repository';
import { ProductRepository } from 'src/repositories/product.repository';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductSetService extends EntityDefaultService<ProductSet> {
  constructor(
    productSetRepository: ProductSetRepository,
    private productRepository: ProductRepository,
    private productSetItemRepository: ProductSetItemRepository,
  ) {
    super(productSetRepository);
  }

  async addProduct(input: {
    productSetId: string;
    productId: string;
    price: number;
  }) {
    const productSet = await this.repository.find(input.productSetId);
    const product = await this.productRepository.find(input.productId);

    return this.productSetItemRepository.create({
      productSet,
      product,
      price: input.price,
    });
  }

  async removeProduct(productSetId: string, productId: string) {
    const productSet = await this.repository.find(productSetId);
    const product = await this.productRepository.find(productId);

    const productSetItem = await this.productSetItemRepository.findOne({
      conditions: { productSet, product },
    });

    return this.productSetItemRepository.delete(productSetItem.id);
  }

  async getItems(productSetId: string) {
    const productSet = await this.repository.find(productSetId);

    const setItems = await this.productSetItemRepository.where({
      conditions: { productSet },
      relations: ['product'],
    });

    (setItems as unknown as EntityPagination<Product>).content =
      setItems.content.map((setItem) => setItem.product);

    return setItems;
  }
}
