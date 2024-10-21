import { Repository, SelectQueryBuilder } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { RecordNotFoundError } from 'src/errors/record-not-found.error';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { UnprocessableEntityError } from 'src/errors/unprocessable-entity.error';

export class QueryBuilder<Entity extends DefaultEntity> {
  private raw = true;
  private currentQuery: SelectQueryBuilder<Entity>;
  private entityName: string;
  constructor(
    private readonly repository: Repository<Entity>,
    private readonly model: new (...args: any[]) => Entity,
    defaultQueryOptions: DefaultQueryOptions,
  ) {
    this.entityName = this.repository.metadata.tableName;

    this.currentQuery = this.repository.createQueryBuilder(this.entityName);

    defaultQueryOptions = new DefaultQueryOptions(defaultQueryOptions);
    if (defaultQueryOptions.includeDeleteds)
      this.currentQuery = this.currentQuery.withDeleted();
  }

  getModel() {
    return this.model;
  }

  where(condition?: EntitySearchKeys<Entity> | null): QueryBuilder<Entity> {
    if (!condition) return this;

    condition = clearNestedFilters(condition) as EntitySearchKeys<Entity>;
    condition = this.removeUnknownFields(condition) as EntitySearchKeys<Entity>;

    type ConditionKeys = keyof typeof condition;
    (Object.keys(condition) as ConditionKeys[]).forEach((key) => {
      if (
        !(condition[key] instanceof Array) &&
        typeof condition[key] === 'object'
      )
        return;

      if (condition[key] instanceof Array && condition[key].length == 0) return;

      let query;
      if (condition[key] instanceof Array) {
        query = `${this.entityName}.${key} IN (:...${key})`;
      } else {
        query = `${this.entityName}.${key} = :${key}`;
      }

      const value = { [key]: condition[key] };

      this.currentQuery = this.raw
        ? this.currentQuery.where(query, value)
        : this.currentQuery.andWhere(query, value);

      this.raw = false;
    });

    return this;
  }

  empty(): QueryBuilder<Entity> {
    const query = '1 = 0';

    this.currentQuery = this.raw
      ? this.currentQuery.where(query)
      : this.currentQuery.andWhere(query);

    return this;
  }

  or(query1: QueryBuilder<Entity>, query2: QueryBuilder<Entity>) {
    const queryCallback = (_: any) => {
      const subQuery1 = query1.getQuery();
      const subQuery2 = query2.getQuery();

      return `(${subQuery1}) OR (${subQuery2})`;
    };

    this.currentQuery = this.raw
      ? this.currentQuery.where(queryCallback)
      : this.currentQuery.andWhere(queryCallback);

    this.raw = false;

    this.currentQuery.setParameters({
      ...query1.getParameters(),
      ...query2.getParameters(),
    });

    return this;
  }

  whereNot(condition?: EntitySearchKeys<Entity> | null): QueryBuilder<Entity> {
    if (!condition) return this;

    condition = clearNestedFilters(condition) as EntitySearchKeys<Entity>;
    condition = this.removeUnknownFields(condition) as EntitySearchKeys<Entity>;

    type ConditionKeys = keyof typeof condition;
    (Object.keys(condition) as ConditionKeys[]).forEach((key) => {
      if (
        !(condition[key] instanceof Array) &&
        typeof condition[key] === 'object'
      )
        return;

      if (condition[key] instanceof Array && condition[key].length == 0) return;

      let query;
      if (condition[key] instanceof Array) {
        query = `${this.entityName}.${key} NOT IN (:...${key})`;
      } else {
        query = `${this.entityName}.${key} != :${key}`;
      }

      const value = { [key]: condition[key] };

      this.currentQuery = this.raw
        ? this.currentQuery.where(query, value)
        : this.currentQuery.andWhere(query, value);

      this.raw = false;
    });

    return this;
  }

  notIn(exceptsQuery: QueryBuilder<Entity>) {
    exceptsQuery.selectFields(['id']);

    const query = `${this.entityName}.id NOT IN (${exceptsQuery.getQuery()})`;

    this.currentQuery = this.raw
      ? this.currentQuery.where(query)
      : this.currentQuery.andWhere(query);

    this.raw = false;

    this.currentQuery.setParameters(exceptsQuery.getParameters());

    return this;
  }

  in(inQuery: QueryBuilder<Entity>) {
    inQuery.selectFields(['id']);

    const query = `${this.entityName}.id IN (${inQuery.getQuery()})`;

    this.currentQuery = this.raw
      ? this.currentQuery.where(query)
      : this.currentQuery.andWhere(query);

    this.raw = false;

    this.currentQuery.setParameters(inQuery.getParameters());

    return this;
  }

  like(
    condition?: EntityKeysWithForcedType<Entity, string> | null,
  ): QueryBuilder<Entity> {
    if (!condition) return this;
    this.removeUnknownFields(condition);

    type ConditionKeys = keyof typeof condition;
    (Object.keys(condition) as ConditionKeys[]).forEach((key) => {
      const query = `${this.entityName}.${key} LIKE :namePattern`;
      const value = { namePattern: `%${condition[key]}%` };

      this.currentQuery = this.raw
        ? this.currentQuery.where(query, value)
        : this.currentQuery.andWhere(query, value);

      this.raw = false;
    });

    return this;
  }

  after(condition?: EntitySearchKeys<Entity> | null): QueryBuilder<Entity> {
    if (!condition) return this;
    this.removeUnknownFields(condition);

    type ConditionKeys = keyof typeof condition;
    (Object.keys(condition) as ConditionKeys[]).forEach((key) => {
      const query = `${this.entityName}.${key} > :comparedDate`;
      const value = { comparedDate: condition[key] };

      this.currentQuery = this.raw
        ? this.currentQuery.where(query, value)
        : this.currentQuery.andWhere(query, value);

      this.raw = false;
    });

    return this;
  }

  before(condition?: EntitySearchKeys<Entity> | null): QueryBuilder<Entity> {
    if (!condition) return this;
    this.removeUnknownFields(condition);

    type ConditionKeys = keyof typeof condition;
    (Object.keys(condition) as ConditionKeys[]).forEach((key) => {
      const query = `${this.entityName}.${key} < :comparedDate`;
      const value = { comparedDate: condition[key] };

      this.currentQuery = this.raw
        ? this.currentQuery.where(query, value)
        : this.currentQuery.andWhere(query, value);

      this.raw = false;
    });

    return this;
  }

  selectFields(fields: (keyof Entity)[] = []): QueryBuilder<Entity> {
    if (fields.length == 0) return this;

    this.currentQuery = this.currentQuery.select(
      fields.map((field) => `${this.entityName}.${String(field)}`),
    );

    return this;
  }

  join(
    relationName: string,
    relationQuery: QueryBuilder<any>,
  ): QueryBuilder<Entity> {
    relationQuery.selectFields(['id']);

    const relationEntity = relationQuery.getModel();

    if (!relationName)
      throw `Invalid relation: ${this.entityName} -> ${relationEntity.name}`;

    this.currentQuery = this.currentQuery
      .innerJoin(
        `${this.entityName}.${String(relationName)}`,
        relationEntity.name,
        `${relationEntity.name}.id IN (${relationQuery.getQuery()})`,
      )
      .setParameters(relationQuery.getParameters());

    return this;
  }

  getQuery(): string {
    return this.currentQuery.getQuery();
  }

  getParameters() {
    return this.currentQuery.getParameters();
  }

  include(relations: (keyof Entity)[] = []): QueryBuilder<Entity> {
    this.validateRequestedRelations(relations);

    relations.forEach((relation) => {
      const relationStr = String(relation);

      this.currentQuery = this.currentQuery.leftJoinAndSelect(
        `${this.entityName}.${relationStr}`,
        relationStr,
      );
    });

    return this;
  }

  includeNested(
    relations: { entity: string; nestedEntity: string }[] = [],
  ): QueryBuilder<Entity> {
    this.validateRequestedRelations(
      relations.map((relation) => relation.entity),
    );

    relations.forEach((relation) => {
      this.include([relation.entity as keyof Entity]);

      this.currentQuery = this.currentQuery.leftJoinAndSelect(
        `${relation.entity}.${relation.nestedEntity}`,
        relation.nestedEntity,
      );
    });

    return this;
  }

  async find(id: string): Promise<Entity> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const filter: EntitySearchKeys<Entity> = { id };

    const foundEntity = await this.where(filter).getOne();

    if (!foundEntity) throw new RecordNotFoundError(this.entityName, id);

    return foundEntity;
  }

  async getOne(): Promise<Entity | null> {
    return this.currentQuery.getOne();
  }

  async getMany(): Promise<Entity[]> {
    return this.currentQuery.getMany();
  }

  async getPaginated(
    page: number,
    pageSize: number,
  ): Promise<EntityPagination<Entity>> {
    this.currentQuery = this.currentQuery.skip((page - 1) * pageSize);
    this.currentQuery = this.currentQuery.take(pageSize);

    const totalEntries = await this.currentQuery.getCount();

    const content = await this.currentQuery.getMany();

    return new EntityPagination(content, page, pageSize, totalEntries);
  }

  private removeUnknownFields(data: any) {
    const columns = this.repository.metadata.columns
      .map((column) => column.propertyName)
      .concat(
        this.repository.metadata.relations.map(
          (relation) => relation.propertyName,
        ),
      );

    const newData = { ...data };

    Object.keys(newData).forEach((key) => {
      if (!columns.includes(key) && !columns.includes(key.replace('Id', '')))
        delete newData[key];
    });

    return newData;
  }

  private validateRequestedRelations(
    requestedRelations: (keyof Entity | string)[] = [],
  ) {
    const entityRelations = this.repository.metadata.relations.map(
      (relation) => relation.propertyName,
    ) as (keyof Entity | string)[];

    requestedRelations.some((requestedRelation) => {
      if (!entityRelations.includes(requestedRelation)) {
        throw new UnprocessableEntityError(
          `Relação ${requestedRelation.toLocaleString()} não existe para ${
            this.entityName
          }`,
        );
      }
    });
  }

  private getRelationName(entity: any) {
    const relation = this.repository.metadata.relations.find(
      (relation) => relation.type == entity,
    );

    return relation?.propertyName;
  }
}

function clearNestedFilters(data: any) {
  const newData = { ...data };

  Object.keys(newData).forEach((key) => {
    const value = newData[key];
    if (value && value.id) {
      newData[`${key}Id`] = value.id;

      delete newData[key];
    }
  });

  return newData;
}

class DefaultQueryOptions {
  includeDeleteds?: boolean;

  constructor(options: DefaultQueryOptions) {
    this.includeDeleteds = options.includeDeleteds || false;
  }
}
