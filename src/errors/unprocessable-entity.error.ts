import { BaseError } from './base.error';

export class UnprocessableEntityError extends BaseError {
  getStatus() {
    return 422;
  }
}
