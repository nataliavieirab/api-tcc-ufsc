import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1730602254764 implements MigrationInterface {
  name = 'CreateTables1730602254764';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role_permission" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "action" character varying NOT NULL, "module" character varying NOT NULL, "roleId" uuid, CONSTRAINT "PK_96c8f1fd25538d3692024115b47" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "street" character varying NOT NULL, "number" character varying NOT NULL, "complement" character varying NOT NULL, "zipCode" character varying NOT NULL, "neighborhoodCode" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customer_address" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "customerId" uuid, "addressId" uuid, CONSTRAINT "PK_23810fb397050d8ac37dae44ff6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "shipping_status_enum" AS ENUM('awaiting', 'in_progress', 'finished')`,
    );
    await queryRunner.query(
      `CREATE TABLE "shipping" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "recipientName" character varying, "status" "shipping_status_enum" NOT NULL, "price" integer NOT NULL, "orderId" uuid, "recipientAddressId" uuid, CONSTRAINT "PK_0dc6ac92ee9cbc2c1611d77804c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "product_set_status_enum" AS ENUM('active', 'inactive')`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_set" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "status" "product_set_status_enum" NOT NULL, "storeId" uuid, CONSTRAINT "PK_88557a9e7f2f0f1a6a11857f694" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_set_item" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "price" integer NOT NULL, "productSetId" uuid, "productId" uuid, CONSTRAINT "PK_bd34364611e9a7263d2451df837" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "storeId" uuid, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_category" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "productId" uuid, "categoryId" uuid, CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "add_on" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "storeId" uuid, CONSTRAINT "PK_9af1f3f0ef87a2f944551685596" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_add_on" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "price" integer NOT NULL, "productId" uuid, "addOnId" uuid, CONSTRAINT "PK_c4e1909a15d077719bdedd84358" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_option_value" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "value" character varying NOT NULL, "price" integer NOT NULL, "optionId" uuid, CONSTRAINT "PK_2ab71ed3b21be5800905c621535" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "product_option_type_enum" AS ENUM('free_values', 'fixed_values')`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_option" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "type" "product_option_type_enum" NOT NULL, "required" boolean NOT NULL, "productId" uuid, CONSTRAINT "PK_4cf3c467e9bc764bdd32c4cd938" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "defaultPrice" integer NOT NULL, "storeId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bag_item_option" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "value" character varying, "bagItemId" uuid, "productOptionId" uuid, "optionValueId" uuid, CONSTRAINT "PK_5a2b0ac7abbbb46ce190b7d602b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bag_item_add_on" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "quantity" integer NOT NULL, "bagItemId" uuid, "addOnId" uuid, CONSTRAINT "PK_9fb2cebcb1920e4a265737d6a30" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bag_item" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "quantity" integer NOT NULL, "unitPrice" integer NOT NULL, "bagId" uuid, "productId" uuid, "shippingId" uuid, CONSTRAINT "PK_f8bcc64dfcace9f15ff94bacc63" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "bag_status_enum" AS ENUM('opened', 'ordered')`,
    );
    await queryRunner.query(
      `CREATE TABLE "bag" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "status" "bag_status_enum" NOT NULL DEFAULT 'opened', "storeId" uuid, "customerId" uuid, CONSTRAINT "PK_6e681d0246f71dc274b5a5d9955" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "payment_type_type_enum" AS ENUM('cash', 'credit', 'debit', 'pix', 'transfer')`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment_type" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "type" "payment_type_type_enum" NOT NULL, "storeId" uuid, CONSTRAINT "PK_4f301e328eaf2127773c889ab94" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "value" integer NOT NULL, "paymentTypeId" uuid, "orderId" uuid, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "order_status_enum" AS ENUM('PENDING', 'ACCEPTED', 'SHIPPING', 'REFUSED', 'FINISHED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "date" TIMESTAMP NOT NULL, "bagPrice" integer NOT NULL, "shippingPrice" integer NOT NULL, "totalPrice" integer NOT NULL, "observation" character varying, "status" "order_status_enum" NOT NULL DEFAULT 'PENDING', "bagId" uuid, "cashRegisterId" uuid, "preferredPaymentTypeId" uuid, CONSTRAINT "REL_25bcfbf4b3859ce2b53c75f230" UNIQUE ("bagId"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cash_register" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "openingDate" TIMESTAMP NOT NULL, "closingDate" TIMESTAMP NOT NULL, "storeId" uuid, "responsibleUserId" uuid, CONSTRAINT "PK_6278251c4df289cd438c5e11df8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "store_address" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "storeId" uuid, "addressId" uuid, CONSTRAINT "REL_eedd0793610df1d4a69ef6f83e" UNIQUE ("storeId"), CONSTRAINT "PK_f3eb3afc763da3076e80e2459dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "delivery_settings_status_enum" AS ENUM('open', 'closed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "delivery_settings" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "startHour" TIMESTAMP NOT NULL, "endHour" TIMESTAMP NOT NULL, "status" "delivery_settings_status_enum" NOT NULL DEFAULT 'open', "storeId" uuid, CONSTRAINT "REL_f3238c9fcd98509362544169a5" UNIQUE ("storeId"), CONSTRAINT "PK_4e465b6ab6d5d228142f32ec5d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "store" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "storeId" uuid, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "user_role_systemrole_enum" AS ENUM('SYSTEM_ADMIN', 'SYSTEM_ASSISTANT', 'ORGANIZATION_ADMIN', 'ORGANIZATION_ASSISTANT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "systemRole" "user_role_systemrole_enum", "userId" uuid, "roleId" uuid, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userName" character varying NOT NULL, "password" character varying NOT NULL, "storeId" uuid, CONSTRAINT "userName" UNIQUE ("userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "delivery_neighborhood" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "neighborhoodCode" character varying NOT NULL, "neighborhoodName" character varying NOT NULL, "deliveryFee" integer NOT NULL, "deliverySettingsId" uuid, CONSTRAINT "PK_4053662190b79eef91f3f2a4723" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_address" ADD CONSTRAINT "FK_af004ad3c5bf7e3096f5d40190f" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_address" ADD CONSTRAINT "FK_6ef8ae018c5db1b0759503e7b94" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipping" ADD CONSTRAINT "FK_ca6a07e6f19abf7a0f2fadf62eb" FOREIGN KEY ("orderId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipping" ADD CONSTRAINT "FK_c54e1291f00101195c741d0b043" FOREIGN KEY ("recipientAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_set" ADD CONSTRAINT "FK_2eafe686c7792dd3db96bd1cebe" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_set_item" ADD CONSTRAINT "FK_454ba320ec27fb25569dbc1aa88" FOREIGN KEY ("productSetId") REFERENCES "product_set"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_set_item" ADD CONSTRAINT "FK_5fe3351e8f8f08f85a8512204e1" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_52d64a21bc11cd2b4bbabcc5d4b" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ADD CONSTRAINT "FK_930110e92aed1778939fdbdb302" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ADD CONSTRAINT "FK_559e1bc4d01ef1e56d75117ab9c" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "add_on" ADD CONSTRAINT "FK_0297d8cd62d2f3dc8f52d9f9521" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_add_on" ADD CONSTRAINT "FK_89bb658c1f14631fa332f887a87" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_add_on" ADD CONSTRAINT "FK_9fa4e07a2b0930b3460768d159c" FOREIGN KEY ("addOnId") REFERENCES "add_on"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_value" ADD CONSTRAINT "FK_0cfedcaea398f4844c568d90f09" FOREIGN KEY ("optionId") REFERENCES "product_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option" ADD CONSTRAINT "FK_2ca1aab0a82e9c0058d8465ad02" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_32eaa54ad96b26459158464379a" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item_option" ADD CONSTRAINT "FK_1285ba2925984ddef9f5c616267" FOREIGN KEY ("bagItemId") REFERENCES "bag_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item_option" ADD CONSTRAINT "FK_b7ed42ee2941e05e0fbb72e8ff2" FOREIGN KEY ("productOptionId") REFERENCES "product_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item_option" ADD CONSTRAINT "FK_d163ecca636604e416836bc61bf" FOREIGN KEY ("optionValueId") REFERENCES "product_option_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item_add_on" ADD CONSTRAINT "FK_b72706a163e579e11cbcb7c9a6a" FOREIGN KEY ("bagItemId") REFERENCES "bag_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item_add_on" ADD CONSTRAINT "FK_e2fc02dc340493585dc2a86bb58" FOREIGN KEY ("addOnId") REFERENCES "add_on"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item" ADD CONSTRAINT "FK_95cc58b8a2cdeb166a0a91f3846" FOREIGN KEY ("bagId") REFERENCES "bag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item" ADD CONSTRAINT "FK_75860820b90cc337cc549b38271" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item" ADD CONSTRAINT "FK_1e1aa4267f64455dce174251ace" FOREIGN KEY ("shippingId") REFERENCES "bag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag" ADD CONSTRAINT "FK_7fab162e50580f0ca499f97795c" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag" ADD CONSTRAINT "FK_eb1aba00b0d7249da4b1139b636" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_type" ADD CONSTRAINT "FK_ef751348eb3c7c2c5e2c3aece32" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_7275d1212ed427833ef3630adfb" FOREIGN KEY ("paymentTypeId") REFERENCES "payment_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_d09d285fe1645cd2f0db811e293" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_25bcfbf4b3859ce2b53c75f2301" FOREIGN KEY ("bagId") REFERENCES "bag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_9eeeee13452e708d68722faac1b" FOREIGN KEY ("cashRegisterId") REFERENCES "cash_register"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_671d0abf37f4bc87df5826abd08" FOREIGN KEY ("preferredPaymentTypeId") REFERENCES "payment_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cash_register" ADD CONSTRAINT "FK_cc8bfcbc0f10b3630203c274f36" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cash_register" ADD CONSTRAINT "FK_2cdc4d528575f5713b57ed03461" FOREIGN KEY ("responsibleUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_address" ADD CONSTRAINT "FK_eedd0793610df1d4a69ef6f83e3" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_address" ADD CONSTRAINT "FK_ccd958dacda2830b01a615f4747" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_settings" ADD CONSTRAINT "FK_f3238c9fcd98509362544169a57" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_21f700e4fd47e711f9a40785e7d" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_e1352f3eacfce12c2b7bcc5b9f8" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_neighborhood" ADD CONSTRAINT "FK_afc21b289fdf89d1cfe9947e959" FOREIGN KEY ("deliverySettingsId") REFERENCES "delivery_settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery_neighborhood" DROP CONSTRAINT "FK_afc21b289fdf89d1cfe9947e959"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_e1352f3eacfce12c2b7bcc5b9f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "FK_21f700e4fd47e711f9a40785e7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_settings" DROP CONSTRAINT "FK_f3238c9fcd98509362544169a57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_address" DROP CONSTRAINT "FK_ccd958dacda2830b01a615f4747"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_address" DROP CONSTRAINT "FK_eedd0793610df1d4a69ef6f83e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cash_register" DROP CONSTRAINT "FK_2cdc4d528575f5713b57ed03461"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cash_register" DROP CONSTRAINT "FK_cc8bfcbc0f10b3630203c274f36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_671d0abf37f4bc87df5826abd08"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_9eeeee13452e708d68722faac1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_25bcfbf4b3859ce2b53c75f2301"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_d09d285fe1645cd2f0db811e293"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_7275d1212ed427833ef3630adfb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_type" DROP CONSTRAINT "FK_ef751348eb3c7c2c5e2c3aece32"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag" DROP CONSTRAINT "FK_eb1aba00b0d7249da4b1139b636"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag" DROP CONSTRAINT "FK_7fab162e50580f0ca499f97795c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item" DROP CONSTRAINT "FK_1e1aa4267f64455dce174251ace"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item" DROP CONSTRAINT "FK_75860820b90cc337cc549b38271"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item" DROP CONSTRAINT "FK_95cc58b8a2cdeb166a0a91f3846"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item_add_on" DROP CONSTRAINT "FK_e2fc02dc340493585dc2a86bb58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item_add_on" DROP CONSTRAINT "FK_b72706a163e579e11cbcb7c9a6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item_option" DROP CONSTRAINT "FK_d163ecca636604e416836bc61bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item_option" DROP CONSTRAINT "FK_b7ed42ee2941e05e0fbb72e8ff2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bag_item_option" DROP CONSTRAINT "FK_1285ba2925984ddef9f5c616267"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_32eaa54ad96b26459158464379a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option" DROP CONSTRAINT "FK_2ca1aab0a82e9c0058d8465ad02"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_value" DROP CONSTRAINT "FK_0cfedcaea398f4844c568d90f09"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_add_on" DROP CONSTRAINT "FK_9fa4e07a2b0930b3460768d159c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_add_on" DROP CONSTRAINT "FK_89bb658c1f14631fa332f887a87"`,
    );
    await queryRunner.query(
      `ALTER TABLE "add_on" DROP CONSTRAINT "FK_0297d8cd62d2f3dc8f52d9f9521"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" DROP CONSTRAINT "FK_559e1bc4d01ef1e56d75117ab9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" DROP CONSTRAINT "FK_930110e92aed1778939fdbdb302"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_52d64a21bc11cd2b4bbabcc5d4b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_set_item" DROP CONSTRAINT "FK_5fe3351e8f8f08f85a8512204e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_set_item" DROP CONSTRAINT "FK_454ba320ec27fb25569dbc1aa88"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_set" DROP CONSTRAINT "FK_2eafe686c7792dd3db96bd1cebe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipping" DROP CONSTRAINT "FK_c54e1291f00101195c741d0b043"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipping" DROP CONSTRAINT "FK_ca6a07e6f19abf7a0f2fadf62eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_address" DROP CONSTRAINT "FK_6ef8ae018c5db1b0759503e7b94"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_address" DROP CONSTRAINT "FK_af004ad3c5bf7e3096f5d40190f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3130a39c1e4a740d044e685730"`,
    );
    await queryRunner.query(`DROP TABLE "delivery_neighborhood"`);
    await queryRunner.query(`DROP TABLE "organization"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TYPE "user_role_systemrole_enum"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "store"`);
    await queryRunner.query(`DROP TABLE "delivery_settings"`);
    await queryRunner.query(`DROP TYPE "delivery_settings_status_enum"`);
    await queryRunner.query(`DROP TABLE "store_address"`);
    await queryRunner.query(`DROP TABLE "cash_register"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TYPE "order_status_enum"`);
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TABLE "payment_type"`);
    await queryRunner.query(`DROP TYPE "payment_type_type_enum"`);
    await queryRunner.query(`DROP TABLE "bag"`);
    await queryRunner.query(`DROP TYPE "bag_status_enum"`);
    await queryRunner.query(`DROP TABLE "bag_item"`);
    await queryRunner.query(`DROP TABLE "bag_item_add_on"`);
    await queryRunner.query(`DROP TABLE "bag_item_option"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "product_option"`);
    await queryRunner.query(`DROP TYPE "product_option_type_enum"`);
    await queryRunner.query(`DROP TABLE "product_option_value"`);
    await queryRunner.query(`DROP TABLE "product_add_on"`);
    await queryRunner.query(`DROP TABLE "add_on"`);
    await queryRunner.query(`DROP TABLE "product_category"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "product_set_item"`);
    await queryRunner.query(`DROP TABLE "product_set"`);
    await queryRunner.query(`DROP TYPE "product_set_status_enum"`);
    await queryRunner.query(`DROP TABLE "shipping"`);
    await queryRunner.query(`DROP TYPE "shipping_status_enum"`);
    await queryRunner.query(`DROP TABLE "customer"`);
    await queryRunner.query(`DROP TABLE "customer_address"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "role_permission"`);
  }
}
