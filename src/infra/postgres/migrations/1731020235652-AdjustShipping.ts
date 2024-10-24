import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustShipping1731020235652 implements MigrationInterface {
  name = 'AdjustShipping1731020235652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shipping" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "shipping" ADD "price" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shipping" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "shipping" ADD "price" integer NOT NULL`,
    );
  }
}
