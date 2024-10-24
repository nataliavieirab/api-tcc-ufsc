import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustProduct1731006710262 implements MigrationInterface {
  name = 'AdjustProduct1731006710262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "defaultPrice" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "defaultPrice" SET NOT NULL`,
    );
  }
}
