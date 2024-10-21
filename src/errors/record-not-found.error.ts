import { BaseError } from './base.error';

export class RecordNotFoundError extends BaseError {
  constructor(entityName: string, id: string) {
    const message = `${entityName} não encontrado com id ${id}`;

    super(message);
  }

  getStatus() {
    return 404;
  }
}
