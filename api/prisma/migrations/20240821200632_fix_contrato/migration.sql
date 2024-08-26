-- DropForeignKey
ALTER TABLE "contratos" DROP CONSTRAINT "contratos_personalId_fkey";

-- AlterTable
ALTER TABLE "contratos" ALTER COLUMN "personalId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
