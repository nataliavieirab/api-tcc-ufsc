import { ModuleRef, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ControllerExceptionsHandler } from './middlewares/controller-exceptions-handler.middleware';
import { DependenciesResolver } from './utils/dependencies-resolver';

import './startup_actions/migrate-organizations';
import { AfterBootstrapCallbacks } from './after-bootstrap-callbacks';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  DependenciesResolver.setContext(app.get(ModuleRef));

  await AfterBootstrapCallbacks.excuteCallbacks();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new ControllerExceptionsHandler());

  await app.listen(3333);
}
bootstrap();
