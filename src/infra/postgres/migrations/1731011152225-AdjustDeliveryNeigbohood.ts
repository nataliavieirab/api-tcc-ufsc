import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustDeliveryNeigbohood1731011152225
  implements MigrationInterface
{
  name = 'AdjustDeliveryNeigbohood1731011152225';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery_neighborhood" DROP COLUMN "deliveryFee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_neighborhood" ADD "deliveryFee" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery_neighborhood" DROP COLUMN "deliveryFee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_neighborhood" ADD "deliveryFee" integer NOT NULL`,
    );
  }
}
