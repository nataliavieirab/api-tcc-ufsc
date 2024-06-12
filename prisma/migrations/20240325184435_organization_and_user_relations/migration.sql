/*
  Warnings:

  - You are about to drop the column `adm_id` on the `Organization` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organization_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Franchise" DROP CONSTRAINT "Franchise_organization_id_fkey";

-- DropIndex
DROP INDEX "Organization_adm_id_key";

-- AlterTable
ALTER TABLE "Franchise" ALTER COLUMN "organization_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "adm_id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "organization_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_organization_id_key" ON "User"("organization_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Franchise" ADD CONSTRAINT "Franchise_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
