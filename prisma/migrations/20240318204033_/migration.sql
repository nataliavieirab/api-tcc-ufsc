/*
  Warnings:

  - You are about to drop the column `roles` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organization_id]` on the table `Franchise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organization_id` to the `Franchise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Franchise" ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roles";

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "adm_id" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_adm_id_key" ON "Organization"("adm_id");

-- CreateIndex
CREATE UNIQUE INDEX "Franchise_organization_id_key" ON "Franchise"("organization_id");

-- AddForeignKey
ALTER TABLE "Franchise" ADD CONSTRAINT "Franchise_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
