import { BaseError } from './base.error';

export class ForbiddenError extends BaseError {
  constructor() {
    super('Você não tem permissão para executar essa ação');
  }

  getStatus() {
    return 403;
  }
}
