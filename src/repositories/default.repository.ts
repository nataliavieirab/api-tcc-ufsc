import { DefaultEntity } from 'src/entities/default-entity';
import { QueryBuilder } from 'src/entities/query-builder';
import { CurrentRequestService } from 'src/services/application/current-request.service';
import { DependenciesResolver } from 'src/utils/dependencies-resolver';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { Repository } from 'typeorm';

export abstract class DefaultRepository<EntityType extends DefaultEntity> {
  protected readonly model: (new (...args: any[]) => EntityType) &
    typeof DefaultEntity;

  constructor(model: new (...args: any[]) => EntityType) {
    this.model = model as (new (...args: any[]) => EntityType) &
      typeof DefaultEntity;
  }

  getEntityAttributes() {
    return getRepository(this.model.name).metadata.columns.map(
      (column) => column.propertyName,
    );
  }

  getEntityRelations() {
    return getRepository(this.model.name).metadata.relations.map(
      (relation) => relation.propertyName,
    );
  }

  getModel() {
    return this.model;
  }

  async create(data: EntitySearchKeys<EntityType>): Promise<EntityType> {
    const entity = await this.model.create(data);

    return entity;
  }

  async update(
    id: string,
    data: EntitySearchKeys<EntityType>,
    includeDeleted = false,
  ): Promise<EntityType> {
    const entity = await this.accessibleBy(this.newQuery(includeDeleted)).find(
      id,
    );

    await entity.update(data);

    return entity;
  }

  async findOne(
    queryOptions: UniqueEntityWithFiltersQueryOptions<EntityType>,
  ): Promise<EntityType | null> {
    queryOptions = new UniqueEntityWithFiltersQueryOptions(queryOptions);

    let query = this.getQueryFor(queryOptions);

    if (!queryOptions.skipAccessFilter) query = this.accessibleBy(query);

    const data = await query.getOne();

    return data;
  }

  async where(
    plainQueryOptions: ManyEntitiesQueryOptionsType<EntityType>,
  ): Promise<EntityPagination<EntityType>> {
    const queryOptions = new ManyEntitiesQueryOptions(plainQueryOptions);

    let query = this.getQueryFor(queryOptions);

    if (!queryOptions.skipAccessFilter) query = this.accessibleBy(query);

    const data = await query.getPaginated(
      queryOptions.pagination.page,
      queryOptions.pagination.pageSize,
    );

    return data;
  }

  async getMany(
    plainQueryOptions: ManyEntitiesQueryOptionsType<EntityType>,
  ): Promise<EntityType[]> {
    const queryOptions = new ManyEntitiesQueryOptions(plainQueryOptions);

    let query = this.getQueryFor(queryOptions);

    if (!queryOptions.skipAccessFilter) query = this.accessibleBy(query);

    const data = await query.getMany();

    return data;
  }

  async find(
    id: string,
    queryOptions?: UniqueEntityQueryOptions<EntityType>,
  ): Promise<EntityType> {
    queryOptions = new UniqueEntityQueryOptions(queryOptions);

    let query = this.newQuery(queryOptions.includeDeleteds)
      .include(queryOptions.relations)
      .includeNested(queryOptions.nestedRelations)
      .selectFields(queryOptions.selectFields);

    if (!queryOptions.skipAccessFilter) query = this.accessibleBy(query);

    return await query.find(id);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.accessibleBy(this.newQuery()).find(id);

    await entity.delete();
  }

  getQueryFor(
    plainQueryOptions: UniqueEntityWithFiltersQueryOptions<EntityType>,
  ): QueryBuilder<EntityType> {
    const queryOptions = new UniqueEntityWithFiltersQueryOptions(
      plainQueryOptions,
    );

    const query = this.newQuery(queryOptions.includeDeleteds)
      .where(queryOptions.conditions)
      .whereNot(queryOptions.conditionsNot)
      .like(queryOptions.conditionsLike)
      .after(queryOptions.conditionsAfter)
      .before(queryOptions.conditionsBefore)
      .include(queryOptions.relations)
      .includeNested(queryOptions.nestedRelations)
      .selectFields(queryOptions.selectFields);

    const joins = queryOptions.joins || {};

    Object.keys(joins).forEach((joinKey) => {
      query.join(joinKey, joins[joinKey]);
    });

    return query;
  }

  protected accessibleBy(
    query: QueryBuilder<EntityType>,
  ): QueryBuilder<EntityType> {
    return query;
  }

  protected or(queries: QueryBuilder<EntityType>[]): QueryBuilder<EntityType> {
    if (queries.length === 0) return this.newQuery().empty();
    if (queries.length === 1) return queries[0];

    const currentQuery = this.newQuery().or(
      queries.shift() as QueryBuilder<EntityType>,
      queries.shift() as QueryBuilder<EntityType>,
    );

    queries.forEach((query) => {
      currentQuery.or(currentQuery, query);
    });

    return currentQuery;
  }

  protected newQuery(includeDeleteds = false): QueryBuilder<EntityType> {
    return new QueryBuilder<EntityType>(
      getRepository(this.model.name),
      this.model,
      {
        includeDeleteds,
      },
    );
  }

  getRelationEntity(field: any): any {
    const relation = getRepository(this.model.name).metadata.relations.find(
      (relation) => relation.propertyName == field,
    );

    return relation?.type as any;
  }
}

function getRepository<Entity>(name: string): Repository<Entity> {
  const currentRequestService: CurrentRequestService =
    DependenciesResolver.getResolvedDependency(CurrentRequestService);

  const queryRunner = currentRequestService.getCurrentQueryRunner();

  return queryRunner.manager.getRepository(name);
}

export type DataLayerQueryObject = any;

export class UniqueEntityQueryOptions<entityType extends DefaultEntity> {
  relations?: (keyof entityType)[];
  nestedRelations?: { entity: string; nestedEntity: string }[];
  includeDeleteds?: boolean;
  selectFields?: (keyof entityType)[];
  skipAccessFilter?: boolean;

  constructor(options?: UniqueEntityQueryOptions<entityType>) {
    this.relations = options?.relations || [];
    this.nestedRelations = options?.nestedRelations || [];
    this.includeDeleteds = options?.includeDeleteds || false;
    this.selectFields = options?.selectFields || [];
    this.skipAccessFilter = options?.skipAccessFilter || false;
  }
}

export class UniqueEntityWithFiltersQueryOptions<
  entityType extends DefaultEntity,
> extends UniqueEntityQueryOptions<entityType> {
  conditions?: EntitySearchKeys<entityType> | null;
  conditionsNot?: EntitySearchKeys<entityType> | null;
  conditionsAfter?: EntitySearchKeys<entityType> | null;
  conditionsBefore?: EntitySearchKeys<entityType> | null;
  conditionsLike?: EntityKeysWithForcedType<entityType, string> | null;

  joins?: {
    [relationKey: string]: DataLayerQueryObject;
  } | null;

  constructor(options: UniqueEntityWithFiltersQueryOptions<entityType>) {
    super(options);
    this.conditions = options.conditions || null;
    this.conditionsNot = options.conditionsNot || null;
    this.conditionsLike = options.conditionsLike || null;
    this.joins = options.joins || null;
  }
}

export class ManyEntitiesQueryOptions<
  entityType extends DefaultEntity,
> extends UniqueEntityWithFiltersQueryOptions<entityType> {
  pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 };

  constructor(options: ManyEntitiesQueryOptionsType<entityType>) {
    super(options);
    if (options.pagination) {
      this.pagination.page = options.pagination.page || 1;
      this.pagination.pageSize = options.pagination.pageSize || 10;
    }
  }
}

export type ManyEntitiesQueryOptionsType<entityType extends DefaultEntity> = {
  relations?: (keyof entityType)[];
  nestedRelations?: { entity: string; nestedEntity: string }[];
  includeDeleteds?: boolean;
  selectFields?: (keyof entityType)[];
  conditions?: EntitySearchKeys<entityType> | null;
  conditionsNot?: EntitySearchKeys<entityType> | null;
  conditionsAfter?: EntitySearchKeys<entityType> | null;
  conditionsBefore?: EntitySearchKeys<entityType> | null;
  conditionsLike?: EntityKeysWithForcedType<entityType, string> | null;
  pagination?: { page: number | undefined; pageSize: number | undefined };
  skipAccessFilter?: boolean;

  joins?: {
    [relationKey: string]: DataLayerQueryObject;
  } | null;
};
