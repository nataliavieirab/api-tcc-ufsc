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
import { ProductSetRepository } from 'src/repositories/product-set.repository';
import { ProductSetStatus } from 'src/entities/product-set.entity';
import { ProductSetItemRepository } from 'src/repositories/product-set-item.repository';

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
    private productSetRepository: ProductSetRepository,
    private productSetItemRepository: ProductSetItemRepository,
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
    available: boolean,
    findFilters: {
      like_name?: string;
      name?: string;
    },
  ) {
    const { likeFilters, simpleFilters } = await this.transformDecoratedFilters(
      findFilters,
    );

    const category = await this.categoryRepository.find(categoryId);
    const productCategories = this.productCategoryRepository.getQueryFor({
      conditions: { category },
    });

    const products = this.repository.getQueryFor({
      conditions: simpleFilters,
      conditionsLike: likeFilters,
      joins: {
        productCategories,
      },
    });

    const productSetsQuery = available
      ? {
          conditions: { status: ProductSetStatus.ACTIVE },
        }
      : {};

    const productSets = this.productSetRepository.getQueryFor(productSetsQuery);

    const items = await this.productSetItemRepository.where({
      joins: {
        product: products,
        productSet: productSets,
      },
      nestedRelations: [
        {
          entity: 'product',
          nestedEntity: 'productAddOns',
        },
        {
          entity: 'productAddOns',
          nestedEntity: 'addOn',
        },
        {
          entity: 'product',
          nestedEntity: 'productOptions',
        },
        {
          entity: 'productOptions',
          nestedEntity: 'values',
        },
      ],
    });

    return {
      ...items,
      content: items.content.map((item) => ({
        id: item.id,
        name: item.product.name,
        price: item.price,
        addOns: item.product.productAddOns.map((productAddOn) => ({
          ...productAddOn.addOn,
          id: productAddOn.id,
          price: productAddOn.price,
        })),
        options: item.product.productOptions,
      })),
    };
  }
}
