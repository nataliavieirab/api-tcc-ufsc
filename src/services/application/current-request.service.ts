import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { User } from 'src/entities/user.entity';
import { QueryRunner } from 'typeorm';

@Injectable()
export class CurrentRequestService {
  public readonly storage: AsyncLocalStorage<any>;

  constructor() {
    this.storage = new AsyncLocalStorage();
  }

  openScope(callback: () => void): void {
    this.storage.run(new Map(), callback);
  }

  setCurrentQueryRunner(queryRunner: QueryRunner) {
    const stored = this.storage.getStore() || {};
    stored['queryRunner'] = queryRunner;

    return this.storage.enterWith(stored);
  }

  getCurrentQueryRunner(): QueryRunner {
    const stored = this.storage.getStore();

    return stored['queryRunner'];
  }

  setCurrentUser(user: User) {
    const stored = this.storage.getStore() || {};
    stored['user'] = user;

    return this.storage.enterWith(stored);
  }

  getCurrentUser(): User {
    const stored = this.storage.getStore();

    return stored['user'];
  }
}
