-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "cargo" TEXT,
ADD COLUMN     "especial" TEXT[],
ADD COLUMN     "preco" DECIMAL(65,30);
