import { randomUUID } from 'crypto';
import { CurrentRequestService } from 'src/services/application/current-request.service';
import { DependenciesResolver } from 'src/utils/dependencies-resolver';
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm';
import { validate } from 'class-validator';
import { UnprocessableEntityError } from 'src/errors/unprocessable-entity.error';

export class DefaultEntity {
  @BeforeInsert()
  beforeInsert(): void {
    this.id = this.id || randomUUID();
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
  @BeforeUpdate()
  beforeUpdate(): void {
    this.updatedAt = new Date();
  }
  @PrimaryColumn({ type: 'uuid', unique: true })
  id!: string;
  @CreateDateColumn()
  createdAt: Date = new Date();
  @UpdateDateColumn()
  updatedAt: Date = new Date();

  static async create<T>(
    this: { new (): T } & typeof DefaultEntity,
    data: EntitySearchKeys<T>,
  ): Promise<T> {
    const repository = getRepository(this.name);

    let newData = clearNestedInput(data);
    newData = removeUnknownFields(newData, repository);

    const entity = repository.create(newData);
    const savedEntity = repository.save(entity);
    return savedEntity as unknown as T;
  }

  async update<T extends DefaultEntity>(
    this: T,
    data: EntitySearchKeys<T>,
  ): Promise<void> {
    const repository = getRepository(this.constructor.name);

    let newData = clearNestedInput(data);
    newData = removeUnknownFields(data, repository);

    type TKeys = keyof EntityExactKeys<T>;
    (Object.keys(newData) as TKeys[]).forEach((key) => {
      if (newData[key] == undefined) return;
      const value = newData[key] as T[string & keyof T];
      this[key] = value;
    });

    await this.validateEntity();
    await repository.save(this);
  }

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;

  async delete(): Promise<void> {
    await this.update({ deletedAt: new Date() } as Partial<this>);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async validateEntity() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new UnprocessableEntityError(
        errors
          .map((error) => Object.values(error.constraints || {}))
          .join('; '),
      );
    }
  }
}

function removeUnknownFields<T>(data: T, repository: Repository<T>) {
  const columns = repository.metadata.columns
    .map((column) => column.propertyName)
    .concat(
      repository.metadata.relations.map((relation) => relation.propertyName),
    );
  const newData = { ...data };
  Object.keys(newData).forEach((key) => {
    if (!columns.includes(key) && !columns.includes(key.replace('Id', '')))
      delete newData[key];
  });
  return newData;
}

function clearNestedInput(data: any) {
  const newData = { ...data };
  Object.keys(newData).forEach((key) => {
    const value = newData[key];

    if (value?.id) {
      newData[key] = { id: value.id };
    }

    if (key.includes('Id')) {
      newData['store'] = { id: value };
    }
  });
  return newData;
}

// entra = {
//   storeId: 'vgjgcv,fj.x,njg',
// }

// sai = {
//   storeId: 'vgjgcv,fj.x,njg',
//   store: { id: 'vgjgcv,fj.x,njg' },
// }
function getRepository(name: string) {
  const currentRequestService: CurrentRequestService =
    DependenciesResolver.getResolvedDependency(CurrentRequestService);

  const queryRunner = currentRequestService.getCurrentQueryRunner();

  return queryRunner.manager.getRepository(name);
}
