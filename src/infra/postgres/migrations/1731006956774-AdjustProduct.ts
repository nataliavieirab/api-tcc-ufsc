import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustProduct1731006956774 implements MigrationInterface {
  name = 'AdjustProduct1731006956774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "defaultPrice"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "defaultPrice" double precision`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "defaultPrice"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "defaultPrice" integer`);
  }
}
