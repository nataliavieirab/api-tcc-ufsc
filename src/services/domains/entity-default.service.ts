import { DefaultEntity } from 'src/entities/default-entity';
import { DefaultRepository } from 'src/repositories/default.repository';
import {
  FiltersTransformer,
  TransformedFilters,
} from '../application/filters-transformer.service';
import { EntityPagination } from 'src/utils/entity-pagination.type';

export type FindFiltersType<BaseEntity> = EntityKeysWithPrefix<
  BaseEntity,
  'like_'
> &
  EntityKeysWithSulfix<BaseEntity, 'Id'> &
  EntityKeysWithPrefix<BaseEntity, 'not_'> &
  EntityKeysWithPrefix<BaseEntity, 'after_'> &
  EntityKeysWithPrefix<BaseEntity, 'before_'>;

export abstract class EntityDefaultService<BaseEntity extends DefaultEntity> {
  constructor(protected readonly repository: DefaultRepository<BaseEntity>) {}

  protected async transformDecoratedFilters(
    filters: any,
  ): Promise<TransformedFilters<BaseEntity>> {
    const entityKeys = this.repository.getEntityAttributes();

    return await FiltersTransformer.transformDecoratedFilters(
      filters,
      entityKeys,
    );
  }

  async findAll(
    findFilters: FindFiltersType<BaseEntity>,
    relations: (keyof BaseEntity)[] = [],
    nestedRelations: {
      entity: string;
      nestedEntity: string;
    }[] = [],
  ): Promise<EntityPagination<BaseEntity>> {
    const {
      likeFilters,
      notFilters,
      simpleFilters,
      afterFilters,
      beforeFilters,
    } = await this.transformDecoratedFilters(findFilters);

    return await this.repository.where({
      conditions: simpleFilters,
      conditionsNot: notFilters,
      conditionsAfter: afterFilters,
      conditionsBefore: beforeFilters,
      conditionsLike: likeFilters,
      relations,
      nestedRelations,
    });
  }

  async findById(
    id: string,
    relations?: (keyof BaseEntity)[],
    nestedRelations: {
      entity: string;
      nestedEntity: string;
    }[] = [],
    skipAccessFilter = false,
  ): Promise<BaseEntity> {
    return await this.repository.find(id, {
      relations,
      nestedRelations,
      skipAccessFilter,
    });
  }

  async create(createInput: EntitySearchKeys<BaseEntity>): Promise<BaseEntity> {
    return await this.repository.create(createInput);
  }

  async update(
    id: string,
    updateInput: EntitySearchKeys<BaseEntity>,
  ): Promise<BaseEntity> {
    const entity = await this.repository.update(id, updateInput);
    return entity;
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.find(id);
    return await this.repository.delete(entity.id);
  }
}
