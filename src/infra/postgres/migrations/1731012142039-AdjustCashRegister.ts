import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustCashRegister1731012142039 implements MigrationInterface {
  name = 'AdjustCashRegister1731012142039';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cash_register" ALTER COLUMN "openingDate" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "cash_register" ALTER COLUMN "closingDate" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cash_register" ALTER COLUMN "closingDate" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "cash_register" ALTER COLUMN "openingDate" SET NOT NULL`,
    );
  }
}
