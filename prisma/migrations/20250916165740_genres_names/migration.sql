-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "genreNames" TEXT[] DEFAULT ARRAY[]::TEXT[];
