import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustTables1730920685875 implements MigrationInterface {
  name = 'AdjustTables1730920685875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery_settings" ALTER COLUMN "startHour" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_settings" ALTER COLUMN "endHour" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "store" ADD CONSTRAINT "UQ_66df34da7fb037e24fc7fee642b" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TYPE "user_role_systemrole_enum" RENAME TO "user_role_systemrole_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "user_role_systemrole_enum" AS ENUM('SYSTEM_ADMIN', 'SYSTEM_ASSISTANT', 'ORGANIZATION_ADMIN', 'ORGANIZATION_ASSISTANT', 'STORE_ADMIN')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ALTER COLUMN "systemRole" TYPE "user_role_systemrole_enum" USING "systemRole"::"text"::"user_role_systemrole_enum"`,
    );
    await queryRunner.query(`DROP TYPE "user_role_systemrole_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "user_role_systemrole_enum_old" AS ENUM('SYSTEM_ADMIN', 'SYSTEM_ASSISTANT', 'ORGANIZATION_ADMIN', 'ORGANIZATION_ASSISTANT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ALTER COLUMN "systemRole" TYPE "user_role_systemrole_enum_old" USING "systemRole"::"text"::"user_role_systemrole_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "user_role_systemrole_enum"`);
    await queryRunner.query(
      `ALTER TYPE "user_role_systemrole_enum_old" RENAME TO "user_role_systemrole_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store" DROP CONSTRAINT "UQ_66df34da7fb037e24fc7fee642b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_settings" ALTER COLUMN "endHour" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_settings" ALTER COLUMN "startHour" SET NOT NULL`,
    );
  }
}
