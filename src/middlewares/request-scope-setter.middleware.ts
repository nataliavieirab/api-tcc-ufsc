import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { CurrentRequestService } from 'src/services/application/current-request.service';
import { TenantService } from 'src/services/application/tenant.service';
import { DataSource } from 'typeorm';

@Injectable()
export class RequestScopeSetterMiddleware implements NestMiddleware {
  constructor(
    public dataSource: DataSource,
    private readonly currentRequestService: CurrentRequestService,
    private readonly tenantService: TenantService,
  ) {}

  async use(req: any, res: any, next: NextFunction) {
    this.currentRequestService.openScope(() => {
      const queryRunner = this.dataSource.createQueryRunner();

      this.currentRequestService.setCurrentQueryRunner(queryRunner);

      const orgId = req.headers['x-api-token'];
      req.orgId = orgId;

      if (orgId) this.tenantService.switchTenant(orgId);

      next();
    });
  }
}
