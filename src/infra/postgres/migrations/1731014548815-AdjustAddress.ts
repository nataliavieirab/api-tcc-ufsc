import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustAddress1731014548815 implements MigrationInterface {
  name = 'AdjustAddress1731014548815';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "complement" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "complement" SET NOT NULL`,
    );
  }
}
