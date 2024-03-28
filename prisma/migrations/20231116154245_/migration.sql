/*
  Warnings:

  - A unique constraint covering the columns `[adm_id]` on the table `Franchise` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `birth_date` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "birth_date",
ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Franchise_adm_id_key" ON "Franchise"("adm_id");
