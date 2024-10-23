import { Module } from '@nestjs/common';
import { CurrentRequestService } from 'src/services/application/current-request.service';
import { TenantService } from './tenant.service';
import { postgresDataSource } from 'src/infra/data-source';
import { DataSource } from 'typeorm';

@Module({
  exports: [CurrentRequestService, TenantService],
  providers: [
    CurrentRequestService,
    TenantService,
    {
      provide: DataSource,
      useValue: postgresDataSource,
    },
  ],
})
export class ApplicationModule {}
