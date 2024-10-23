import { INestApplicationContext } from '@nestjs/common';
import { Singleton } from 'src/utils/singleton';

class DependenciesResolverSingleton extends Singleton {
  private appContext?: INestApplicationContext;
  setContext(appContext: INestApplicationContext) {
    this.appContext = appContext;
  }

  getResolvedDependency<T>(className: any): T {
    return this.appContext?.get(className, { strict: false });
  }
}

export const DependenciesResolver =
  DependenciesResolverSingleton.getInstance() as DependenciesResolverSingleton;
