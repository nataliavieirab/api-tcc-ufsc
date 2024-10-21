import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repositories/product.repository';
import { EntityDefaultService } from './entity-default.service';
import { Product } from 'src/entities/product.entity';
import { StoreRepository } from 'src/repositories/store.repository';
import { ProductAddOnRepository } from 'src/repositories/product-add-on.repository';
import { AddOnRepository } from 'src/repositories/add-on.repository';

interface CreateProductInput {
  name: string;
  storeId: string;
}

@Injectable()
export class ProductService extends EntityDefaultService<Product> {
  constructor(
    productRepository: ProductRepository,
    private storeRepository: StoreRepository,
    private productAddOnRepository: ProductAddOnRepository,
    private addOnRepository: AddOnRepository,
  ) {
    super(productRepository);
  }

  async create(createInput: CreateProductInput): Promise<Product> {
    const store = await this.storeRepository.find(createInput.storeId);

    const newProduct = await this.repository.create({
      store,
      name: createInput.name,
    });

    return newProduct;
  }

  async addAddOn(productId: string, addOnId: string): Promise<Product> {
    const product = await this.repository.find(productId);

    const addOn = await this.addOnRepository.find(addOnId);

    await this.productAddOnRepository.create({
      product,
      addOn,
    });

    return product;
  }

  async removeAddOn(productId: string, addOnId: string): Promise<void> {
    const product = await this.repository.find(productId);

    const productAddOn = await this.productAddOnRepository.findOne({
      conditions: {
        product,
        addOn: {
          id: addOnId,
        },
      },
    });

    await this.productAddOnRepository.delete(productAddOn.id);

    return;
  }
}
