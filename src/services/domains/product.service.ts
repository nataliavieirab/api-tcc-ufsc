import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repositories/product.repository';
import { EntityDefaultService } from './entity-default.service';
import { Product } from 'src/entities/product.entity';
import { StoreRepository } from 'src/repositories/store.repository';
import { ProductAddOnRepository } from 'src/repositories/product-add-on.repository';
import { AddOnRepository } from 'src/repositories/add-on.repository';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { CategoryRepository } from 'src/repositories/category.repository';
import { ProductCategoryRepository } from 'src/repositories/product-category.repository';

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
    private categoryRepository: CategoryRepository,
    private productCategoryRepository: ProductCategoryRepository,
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

  async addAddOn(
    productId: string,
    addOnId: string,
    price: number,
  ): Promise<Product> {
    const product = await this.repository.find(productId);

    const addOn = await this.addOnRepository.find(addOnId);

    await this.productAddOnRepository.create({
      product,
      addOn,
      price,
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

  async findByCategory(
    categoryId: string,
    findFilters: {
      like_name?: string;
      name?: string;
    },
  ): Promise<EntityPagination<Product>> {
    const { likeFilters, simpleFilters } = await this.transformDecoratedFilters(
      findFilters,
    );

    const category = await this.categoryRepository.find(categoryId);
    const productCategories = this.productCategoryRepository.getQueryFor({
      conditions: { category },
    });

    return await this.repository.where({
      conditions: simpleFilters,
      conditionsLike: likeFilters,
      joins: {
        productCategories,
      },
    });
  }
}
