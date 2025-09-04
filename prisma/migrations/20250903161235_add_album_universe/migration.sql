-- CreateEnum
CREATE TYPE "Universe" AS ENUM ('NOVA', 'NEXUS');

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "project" "Universe" NOT NULL DEFAULT 'NOVA';
