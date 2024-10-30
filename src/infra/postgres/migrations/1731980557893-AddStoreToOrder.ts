import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStoreToOrder1731980557893 implements MigrationInterface {
  name = 'AddStoreToOrder1731980557893';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" ADD "storeId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_1a79b2f719ecd9f307d62b81093" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_1a79b2f719ecd9f307d62b81093"`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "storeId"`);
  }
}
