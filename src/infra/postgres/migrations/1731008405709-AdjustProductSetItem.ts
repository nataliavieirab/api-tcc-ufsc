import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustProductSetItem1731008405709 implements MigrationInterface {
  name = 'AdjustProductSetItem1731008405709';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_set_item" DROP COLUMN "price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_set_item" ADD "price" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_set_item" DROP COLUMN "price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_set_item" ADD "price" integer NOT NULL`,
    );
  }
}
