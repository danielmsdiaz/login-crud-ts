/*
  Warnings:

  - Made the column `personalId` on table `contratos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "contratos" DROP CONSTRAINT "contratos_personalId_fkey";

-- AlterTable
ALTER TABLE "contratos" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "personalId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
