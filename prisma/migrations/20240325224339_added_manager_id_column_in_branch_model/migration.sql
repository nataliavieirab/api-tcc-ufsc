/*
  Warnings:

  - A unique constraint covering the columns `[manager_id]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "manager_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Branch_manager_id_key" ON "Branch"("manager_id");

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
