import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustBagItemAddOn1731018691767 implements MigrationInterface {
  name = 'AdjustBagItemAddOn1731018691767';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bag_item_add_on" DROP CONSTRAINT "FK_e2fc02dc340493585dc2a86bb58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item_add_on" RENAME COLUMN "addOnId" TO "productAddOnId"`,
    );
    await queryRunner.query(`ALTER TABLE "bag_item" DROP COLUMN "unitPrice"`);
    await queryRunner.query(
      `ALTER TABLE "bag_item" ADD "unitPrice" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item_add_on" ADD CONSTRAINT "FK_4c49ea21a6c73066c5ef24bce88" FOREIGN KEY ("productAddOnId") REFERENCES "product_add_on"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bag_item_add_on" DROP CONSTRAINT "FK_4c49ea21a6c73066c5ef24bce88"`,
    );
    await queryRunner.query(`ALTER TABLE "bag_item" DROP COLUMN "unitPrice"`);
    await queryRunner.query(
      `ALTER TABLE "bag_item" ADD "unitPrice" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item_add_on" RENAME COLUMN "productAddOnId" TO "addOnId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item_add_on" ADD CONSTRAINT "FK_e2fc02dc340493585dc2a86bb58" FOREIGN KEY ("addOnId") REFERENCES "add_on"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
