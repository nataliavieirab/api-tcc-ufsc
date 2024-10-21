import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ControllerExceptionsHandler } from './middlewares/controller-exceptions-handler.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Pipes
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
