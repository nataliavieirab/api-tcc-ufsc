import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { CurrentRequestService } from 'src/services/application/current-request.service';
import { TenantService } from 'src/services/application/tenant.service';
import { DataSource } from 'typeorm';

@Injectable()
export class RequestScopeSetterMiddleware implements NestMiddleware {
  constructor(
    @Inject('DataSource') public dataSource: DataSource,
    private readonly currentRequestService: CurrentRequestService,
    private readonly tenantService: TenantService,
  ) {}

  async use(req: any, res: any, next: NextFunction) {
    this.currentRequestService.openScope(() => {
      this.currentRequestService.setCurrentQueryRunner(
        this.dataSource.createQueryRunner(),
      );

      const orgId = req.headers['X-API-TOKEN'];
      if (orgId) this.tenantService.switchTenant(orgId);

      next();
    });
  }
}
