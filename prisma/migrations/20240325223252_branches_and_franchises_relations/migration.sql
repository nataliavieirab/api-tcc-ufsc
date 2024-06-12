-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_franchise_id_fkey" FOREIGN KEY ("franchise_id") REFERENCES "Franchise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
