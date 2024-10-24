import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustProductOptions1731007326536 implements MigrationInterface {
  name = 'AdjustProductOptions1731007326536';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product_add_on" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "product_add_on" ADD "price" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_value" DROP COLUMN "price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_value" ADD "price" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_option_value" DROP COLUMN "price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_value" ADD "price" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "product_add_on" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "product_add_on" ADD "price" integer NOT NULL`,
    );
  }
}
