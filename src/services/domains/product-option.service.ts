import { Injectable } from '@nestjs/common';
import { ProductOptionRepository } from 'src/repositories/product-option.repository';
import { EntityDefaultService } from './entity-default.service';
import {
  ProductOption,
  ProductOptionType,
} from 'src/entities/product-option.entity';
import { ProductRepository } from 'src/repositories/product.repository';
import { ProductOptionValueRepository } from 'src/repositories/product-option-value.repository';

type CreateProductOptionInput = {
  productId: string;
  name: string;
  type: ProductOptionType;
  required: boolean;
};

@Injectable()
export class ProductOptionService extends EntityDefaultService<ProductOption> {
  constructor(
    productOptionRepository: ProductOptionRepository,
    private productRepository: ProductRepository,
    private productOptionValueRepository: ProductOptionValueRepository,
  ) {
    super(productOptionRepository);
  }

  async create(createInput: CreateProductOptionInput): Promise<ProductOption> {
    const product = await this.productRepository.find(createInput.productId);

    const newProductOption = await this.repository.create({
      product,
      name: createInput.name,
      type: createInput.type,
      required: createInput.required,
    });

    return newProductOption;
  }

  async addValues(
    productOptionId: string,
    values: {
      name: string;
      value: string;
      price: number;
    }[],
  ): Promise<ProductOption> {
    const productOption = await this.repository.find(productOptionId);

    for (const value of values) {
      await this.productOptionValueRepository.create({
        option: productOption,
        name: value.name,
        value: value.value,
        price: value.price,
      });
    }

    return productOption;
  }
}
