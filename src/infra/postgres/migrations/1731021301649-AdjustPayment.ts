import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustPayment1731021301649 implements MigrationInterface {
  name = 'AdjustPayment1731021301649';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "value" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "value" integer NOT NULL`,
    );
  }
}
