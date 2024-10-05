import { BaseError } from './base.error';

export class UnauthorizedError extends BaseError {
  getStatus(): number {
    return 401;
  }
}
