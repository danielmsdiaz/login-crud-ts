/*
  Warnings:

  - Made the column `description` on table `treinos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `alunoId` on table `treinos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "treinos" DROP CONSTRAINT "treinos_alunoId_fkey";

-- AlterTable
ALTER TABLE "treinos" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "alunoId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "treinos" ADD CONSTRAINT "treinos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
