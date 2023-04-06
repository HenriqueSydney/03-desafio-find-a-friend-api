-- AlterTable
ALTER TABLE "pet" ADD COLUMN     "organizationId" TEXT;

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
