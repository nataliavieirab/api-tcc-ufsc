import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/repositories/category.repository';
import { EntityDefaultService } from './entity-default.service';
import { Category } from 'src/entities/category.entity';
import { ProductRepository } from 'src/repositories/product.repository';
import { ProductCategoryRepository } from 'src/repositories/product-category.repository';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class CategoryService extends EntityDefaultService<Category> {
  constructor(
    categoryRepository: CategoryRepository,
    private productRepository: ProductRepository,
    private productCategoryRepository: ProductCategoryRepository,
  ) {
    super(categoryRepository);
  }

  async addProduct(input: { categoryId: string; productId: string }) {
    const category = await this.repository.find(input.categoryId);
    const product = await this.productRepository.find(input.productId);

    return this.productCategoryRepository.create({
      category,
      product,
    });
  }

  async removeProduct(categoryId: string, productId: string) {
    const category = await this.repository.find(categoryId);
    const product = await this.productRepository.find(productId);

    const productCategory = await this.productCategoryRepository.findOne({
      conditions: { category, product },
    });

    return this.productCategoryRepository.delete(productCategory.id);
  }

  async getItems(categoryId: string) {
    const category = await this.repository.find(categoryId);

    const categoryItems = await this.productCategoryRepository.where({
      conditions: { category },
      relations: ['product'],
    });

    (categoryItems as unknown as EntityPagination<Product>).content =
      categoryItems.content.map((setItem) => setItem.product);

    return categoryItems;
  }
}
