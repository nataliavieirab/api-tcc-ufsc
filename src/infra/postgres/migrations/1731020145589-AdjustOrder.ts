import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustOrder1731020145589 implements MigrationInterface {
  name = 'AdjustOrder1731020145589';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "bagPrice"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "bagPrice" double precision NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "shippingPrice"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "shippingPrice" double precision NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalPrice"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "totalPrice" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalPrice"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "totalPrice" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "shippingPrice"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "shippingPrice" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "bagPrice"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "bagPrice" integer NOT NULL`,
    );
  }
}
