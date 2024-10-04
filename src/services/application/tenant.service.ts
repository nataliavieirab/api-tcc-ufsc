import { Inject } from '@nestjs/common';
import { DataSource, MigrationExecutor } from 'typeorm';
import { CurrentRequestService } from './current-request.service';

export class TenantService {
  constructor(
    @Inject('DataSource') public dataSource: DataSource,
    private readonly currentRequestService: CurrentRequestService,
  ) {}

  async createTenant(tenantId: string): Promise<string> {
    const queryRunner = this.getQueryRunner();

    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS ${tenantId}`);

    await this.switchTenant(tenantId);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "migrations" (
        "id" SERIAL NOT NULL, 
        "timestamp" bigint NOT NULL, 
        "name" character varying NOT NULL, 
        CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
      );
    `);

    await this.migrateTenant(tenantId);

    return tenantId;
  }

  async migrateTenant(tenantId: string): Promise<void> {
    const queryRunner = this.getQueryRunner();

    await this.switchTenant(tenantId);

    const migrationExecutor = new MigrationExecutor(
      this.dataSource,
      queryRunner,
    );

    await migrationExecutor.executePendingMigrations();
  }

  async switchTenant(tenantId: string): Promise<void> {
    const queryRunner = this.getQueryRunner();

    await queryRunner.query(this.switchTenantQuery(tenantId));
    await queryRunner.query(this.switchTenantQuery(tenantId));

    return;
  }

  getQueryRunner() {
    return this.currentRequestService.getCurrentQueryRunner();
  }

  private switchTenantQuery(tenantId: string) {
    return `SET search_path TO ${tenantId}`;
  }
}
