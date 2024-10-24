import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustCustomer1731013668646 implements MigrationInterface {
  name = 'AdjustCustomer1731013668646';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb"`,
    );
  }
}
