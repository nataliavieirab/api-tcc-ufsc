import { Singleton } from './utils/singleton';

class AfterBootstrapCallbacksSingleton extends Singleton {
  callbacks: ((...args: any[]) => any)[] = [];

  registerCallback(callback: (...args: any[]) => any) {
    this.callbacks.push(callback);
  }

  async excuteCallbacks() {
    for (const callback of this.callbacks) {
      await callback();
    }
  }
}

export const AfterBootstrapCallbacks =
  AfterBootstrapCallbacksSingleton.getInstance() as AfterBootstrapCallbacksSingleton;
