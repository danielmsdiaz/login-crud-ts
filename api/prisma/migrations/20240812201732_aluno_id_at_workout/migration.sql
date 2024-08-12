-- AlterTable
ALTER TABLE "treinos" ADD COLUMN     "alunoId" INTEGER;

-- AddForeignKey
ALTER TABLE "treinos" ADD CONSTRAINT "treinos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
