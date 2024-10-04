export class BaseError extends Error {
  private status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }

  getStatus() {
    return this.status || 422;
  }

  getResponse() {
    return this.message;
  }
}
