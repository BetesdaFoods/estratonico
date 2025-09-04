-- DropForeignKey
ALTER TABLE "Platform" DROP CONSTRAINT "Platform_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Platform" DROP CONSTRAINT "Platform_songId_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_albumId_fkey";

-- AlterTable
ALTER TABLE "_AlbumToGenre" ADD CONSTRAINT "_AlbumToGenre_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_AlbumToGenre_AB_unique";

-- AddForeignKey
ALTER TABLE "Platform" ADD CONSTRAINT "Platform_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Platform" ADD CONSTRAINT "Platform_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;
