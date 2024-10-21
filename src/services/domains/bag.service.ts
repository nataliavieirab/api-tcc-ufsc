import { Injectable } from '@nestjs/common';
import { BagRepository } from 'src/repositories/bag.repository';
import { EntityDefaultService } from './entity-default.service';
import { Bag, BagStatus } from 'src/entities/bag.entity';
import { CurrentRequestService } from '../application/current-request.service';
import { BagItemRepository } from 'src/repositories/bag-item.repository';
import { ProductOptionRepository } from 'src/repositories/product-option.repository';
import { ProductOptionValueRepository } from 'src/repositories/product-option-value.repository';
import { ProductAddOnRepository } from 'src/repositories/product-add-on.repository';
import { BagItemAddOnRepository } from 'src/repositories/bag-item-add-on.repository';
import { BagItemOptionRepository } from 'src/repositories/bag-item-option.repository';
import { CompanyRepository } from 'src/repositories/company.repository';
import { ProductRepository } from 'src/repositories/product.repository';
import { ProductSetItemRepository } from 'src/repositories/product-set-item.repository';
import { BagItemAddOn } from 'src/entities/bag-item-add-on.entity';
import { BagItemOption } from 'src/entities/bag-item-option.entity';
import { ProductOptionType } from 'src/entities/product-option.entity';
import { BagItem } from 'src/entities/bag-item.entity';

export interface BagItemAddOnEntry {
  productAddOnId: string;
  quantity: number;
}

export interface BagItemOptionEntry {
  productOptionId: string;
  optionValueId?: string;
  rawValue?: string;
}
export interface BagItemEntry {
  productSetItemId: string;
  quantity: number;
  options?: BagItemOptionEntry[];
  addOns?: BagItemAddOnEntry[];
}

@Injectable()
export class BagService extends EntityDefaultService<Bag> {
  constructor(
    bagRepository: BagRepository,
    private currentRequestService: CurrentRequestService,
    private companyRepository: CompanyRepository,
    private bagItemRepository: BagItemRepository,
    private bagItemAddOnRepository: BagItemAddOnRepository,
    private bagItemOptionRepository: BagItemOptionRepository,
    private productRepository: ProductRepository,
    private productSetItemRepository: ProductSetItemRepository,
    private productOptionRepository: ProductOptionRepository,
    private productOptionValueRepository: ProductOptionValueRepository,
    private productAddOnRepository: ProductAddOnRepository,
  ) {
    super(bagRepository);
  }

  async getCurrentBag(companyId: string) {
    const customer = this.currentRequestService.getCurrentCustomer();
    const company = await this.companyRepository.find(companyId);

    let bag = await this.repository.findOne({
      conditions: {
        company,
        customer,
        status: BagStatus.OPENED,
      },
    });

    if (!bag)
      bag = await this.repository.create({
        customer: customer,
        company,
        status: BagStatus.OPENED,
      });

    return bag;
  }

  async addItem(companyId: string, itemEntry: BagItemEntry): Promise<BagItem> {
    const bag = await this.getCurrentBag(companyId);
    const company = await this.companyRepository.find(companyId);

    const productSetItem = await this.productSetItemRepository.find(
      itemEntry.productSetItemId,
    );

    const product = await this.productRepository.findOne({
      conditions: {
        company,
        id: (await productSetItem.product).id,
      },
    });

    const bagItem = await this.bagItemRepository.create({
      bag,
      product,
      quantity: itemEntry.quantity,
      unitPrice: productSetItem.price,
    });

    const bagAddOns: BagItemAddOn[] = [];
    if (itemEntry.addOns) {
      for (const addOn of itemEntry.addOns) {
        const productAddOn = await this.productAddOnRepository.find(
          addOn.productAddOnId,
        );

        const bagItemAddOn = await this.bagItemAddOnRepository.create({
          bagItem,
          addOn: await productAddOn.addOn,
          quantity: addOn.quantity,
        });

        bagAddOns.push(bagItemAddOn);
      }
    }
    bagItem.bagItemAddOns = bagAddOns;

    const bagItemOptions: BagItemOption[] = [];
    if (itemEntry.options) {
      for (const option of itemEntry.options) {
        const productOption = await this.productOptionRepository.find(
          option.productOptionId,
        );

        const optionValue =
          productOption.type == ProductOptionType.FIXED_VALUES
            ? null
            : await this.productOptionValueRepository.find(
                option.optionValueId,
              );

        const bagItemOption = await this.bagItemOptionRepository.create({
          bagItem,
          productOption,
          optionValue,
          value: option.rawValue,
        });

        bagItemOptions.push(bagItemOption);
      }
    }

    bagItem.bagItemOptions = bagItemOptions;

    return bagItem;
  }

  async cleanBag(companyId: string) {
    const bag = await this.getCurrentBag(companyId);
    const items = await bag.items;

    for (const item of items) {
      await item.delete();
    }
  }

  async removeItem(companyId: string, bagItemId: string) {
    const bag = await this.getCurrentBag(companyId);

    const bagItem = await this.bagItemRepository.findOne({
      conditions: {
        bag,
        id: bagItemId,
      },
    });

    await bagItem.delete();
  }
}
