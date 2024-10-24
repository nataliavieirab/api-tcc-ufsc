import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustShipping1731020377111 implements MigrationInterface {
  name = 'AdjustShipping1731020377111';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shipping" DROP CONSTRAINT "FK_ca6a07e6f19abf7a0f2fadf62eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipping" ADD CONSTRAINT "FK_ca6a07e6f19abf7a0f2fadf62eb" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shipping" DROP CONSTRAINT "FK_ca6a07e6f19abf7a0f2fadf62eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipping" ADD CONSTRAINT "FK_ca6a07e6f19abf7a0f2fadf62eb" FOREIGN KEY ("orderId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
