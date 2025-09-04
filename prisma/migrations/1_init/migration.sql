-- Tabla de unión implícita (Album <-> Genre)
CREATE TABLE IF NOT EXISTS "_AlbumToGenre" (
  "A" TEXT NOT NULL,
  "B" TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "_AlbumToGenre_AB_unique" ON "_AlbumToGenre"("A","B");
CREATE INDEX IF NOT EXISTS "_AlbumToGenre_B_index" ON "_AlbumToGenre"("B");

ALTER TABLE "_AlbumToGenre" ADD CONSTRAINT "_AlbumToGenre_A_fkey"
  FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_AlbumToGenre" ADD CONSTRAINT "_AlbumToGenre_B_fkey"
  FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Migrar datos existentes (Album.genreId -> _AlbumToGenre)
INSERT INTO "_AlbumToGenre" ("A","B")
SELECT "id","genreId" FROM "Album" WHERE "genreId" IS NOT NULL
ON CONFLICT ("A","B") DO NOTHING;

-- Quitar FK y columna antiguas
DO $$ BEGIN
  ALTER TABLE "Album" DROP CONSTRAINT IF EXISTS "Album_genreId_fkey";
EXCEPTION WHEN undefined_object THEN NULL; END $$;

ALTER TABLE "Album" DROP COLUMN IF EXISTS "genreId";