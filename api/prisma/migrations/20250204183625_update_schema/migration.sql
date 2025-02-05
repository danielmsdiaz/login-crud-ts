-- DropForeignKey
ALTER TABLE "treinos" DROP CONSTRAINT "treinos_alunoId_fkey";

-- AlterTable
ALTER TABLE "treinos" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "alunoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "treinos" ADD CONSTRAINT "treinos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
