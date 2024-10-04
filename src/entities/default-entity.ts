// import { validateDto, randomUUID } from 'src/external/functions';
// import {
//   BeforeInsert,
//   BeforeUpdate,
//   CreateDateColumn,
//   DeleteDateColumn,
//   PrimaryColumn,
//   UpdateDateColumn,
// } from 'src/external/decorators/orm';
// import { UnprocessableEntityException } from '../exceptions';
// import { DependenciesResolver } from 'src/external/dependencies-resolver';
// import { Repository } from 'src/external/adapters/interfaces';
// import { CurrentRequestService } from 'src/domain/services/application/current_request/current-request.service';
// import { TransactionManager } from 'src/data/repositories/transaction-manager';

import { randomUUID } from 'crypto';
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class DefaultEntity {
  //   repositoryInstance?: Repository<any>;
  //   static repositoryInstance: Repository<any>;
  //   static repository() {
  //     const currentRequestService: CurrentRequestService =
  //       DependenciesResolver.getResolvedDependency('CurrentRequestService');
  //     const transactionManager =
  //       currentRequestService.getMainTransactionManager() as TransactionManager;
  //     return transactionManager.getEntityManager().getRepository(this.name);
  //   }
  //   repository() {
  //     const currentRequestService: CurrentRequestService =
  //       DependenciesResolver.getResolvedDependency('CurrentRequestService');
  //     const transactionManager =
  //       currentRequestService.getMainTransactionManager();
  //     return transactionManager
  //       .getEntityManager()
  //       .getRepository(this.constructor.name);
  //   }
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
  // @DeleteDateColumn({ nullable: true })
  // deletedAt: Date | null = null;
  //   static async create<T>(
  //     this: { new (): T } & typeof DefaultEntity,
  //     data: EntitySearchKeys<T>,
  //   ): Promise<T> {
  //     let newData = clearNestedInput(data);
  //     newData = this.removeUnknownFields(data);
  //     const entity = this.repository().create(newData);
  //     const savedEntity = this.repository().save(entity);
  //     return savedEntity as unknown as T;
  //   }
  //   async update<T extends DefaultEntity>(
  //     this: T,
  //     data: EntitySearchKeys<T>,
  //   ): Promise<void> {
  //     let newData = clearNestedInput(data);
  //     newData = this.removeUnknownFields(data);
  //     type TKeys = keyof EntitySearchKeys<T>;
  //     (Object.keys(newData) as TKeys[]).forEach((key) => {
  //       if (newData[key] == undefined) return;
  //       const value = newData[key] as T[string & keyof T];
  //       this[key] = value;
  //     });
  //     await this.validateEntity();
  //     await (await this.repository()).save(this);
  //   }
  //   async delete(): Promise<void> {
  //     await this.update({ deletedAt: new Date() } as Partial<this>);
  //   }
  //   customValidations: (() => Promise<string | null>)[] = [];
  //   @BeforeInsert()
  //   @BeforeUpdate()
  //   async validateEntity() {
  //     const customErrors = await this.validateCustomErros();
  //     const errors = await validateDto(this);
  //     if (errors.length > 0 || customErrors.length > 0) {
  //       throw new UnprocessableEntityException(
  //         errors
  //           .map((error) => Object.values(error.constraints || {}))
  //           .concat(customErrors)
  //           .join('; '),
  //       );
  //     }
  //   }
  //   private async validateCustomErros(): Promise<string[]> {
  //     const errors: string[] = [];
  //     for (const validation of this.customValidations) {
  //       const error = await validation();
  //       if (error) {
  //         errors.push(error);
  //       }
  //     }
  //     return errors;
  //   }
  //   private removeUnknownFields(data: any) {
  //     return removeUnknownFields(data, this.repository());
  //   }
  //   private static removeUnknownFields(data: any) {
  //     return removeUnknownFields(data, this.repository());
  //   }
  // }
  // function removeUnknownFields(data: any, repository: Repository<any>) {
  //   const columns = repository.metadata.columns
  //     .map((column) => column.propertyName)
  //     .concat(
  //       repository.metadata.relations.map((relation) => relation.propertyName),
  //     );
  //   const newData = { ...data };
  //   Object.keys(newData).forEach((key) => {
  //     if (!columns.includes(key) && !columns.includes(key.replace('Id', '')))
  //       delete newData[key];
  //   });
  //   return newData;
  // }
  // function clearNestedInput(data: any) {
  //   const newData = { ...data };
  //   Object.keys(newData).forEach((key) => {
  //     const value = newData[key];
  //     if (value && value.id) {
  //       newData[key] = { id: value.id };
  //     }
  //   });
  //   return newData;
}
