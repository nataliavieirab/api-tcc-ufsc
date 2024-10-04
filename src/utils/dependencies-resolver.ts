import { INestApplicationContext } from '@nestjs/common';
import { Singleton } from 'src/utils/singleton';

const SyncMappedDependencies = ['CurrentRequestService'] as const;

type SyncMappedDependencies = (typeof SyncMappedDependencies)[number];

class DependenciesResolverSingleton extends Singleton {
  private appContext?: INestApplicationContext;
  setContext(appContext: INestApplicationContext) {
    this.appContext = appContext;
  }

  getResolvedDependency(className: SyncMappedDependencies) {
    return this.appContext?.get(className, { strict: false });
  }
}

export const DependenciesResolver =
  DependenciesResolverSingleton.getInstance() as DependenciesResolverSingleton;
