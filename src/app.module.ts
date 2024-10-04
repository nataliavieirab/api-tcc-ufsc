import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth-.guard';
import { AdminModule } from './modules/admin/admin.module';
import { postgresDataSource } from './infra/data-source';
import { RequestScopeSetterMiddleware } from './middlewares/request-scope-setter.middleware';

@Module({
  imports: [OrganizationModule, AuthModule, JwtModule, AdminModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: 'DataSource',
      useValue: postgresDataSource,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestScopeSetterMiddleware).forRoutes('*');
  }
}
