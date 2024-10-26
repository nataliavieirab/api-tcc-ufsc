import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustBagItem1731096847477 implements MigrationInterface {
  name = 'AdjustBagItem1731096847477';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bag_item" DROP CONSTRAINT "FK_1e1aa4267f64455dce174251ace"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item" ADD CONSTRAINT "FK_1e1aa4267f64455dce174251ace" FOREIGN KEY ("shippingId") REFERENCES "shipping"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bag_item" DROP CONSTRAINT "FK_1e1aa4267f64455dce174251ace"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item" ADD CONSTRAINT "FK_1e1aa4267f64455dce174251ace" FOREIGN KEY ("shippingId") REFERENCES "bag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
