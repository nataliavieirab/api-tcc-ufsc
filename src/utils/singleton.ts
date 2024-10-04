export class Singleton {
  private static instance: typeof this.prototype;
  public static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
}
