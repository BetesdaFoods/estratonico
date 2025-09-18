import db from "./db";

// Obtiene todos los álbumes con sus nombres de géneros (array de strings)
export async function fetchAlbums() {
  return await db.album.findMany({
    select: {
      id: true,
      name: true,
      concept: true,
      conceptRich: true,
      coverImage: true,
      createdAt: true,
      genreNames: true,
      status: true,
      project: true,
      publishedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

// Elimina un álbum por ID
export async function deleteAlbum(id: string) {
  return await db.album.delete({ where: { id } });
}

// Crea un nuevo álbum usando genreNames (array de strings)
export async function createAlbum(data: {
  name: string;
  concept: string;
  conceptRich?: any;
  coverImage?: string | null;
  createdAt: Date;
  genreNames: string[];
  status?: "DRAFT" | "PUBLISHED";
  project?: "NOVA" | "NEXUS";
  publishedAt?: Date | null;
  platforms?: { name: string; url: string }[];
}) {
  const uniqueGenres = Array.from(new Set((data.genreNames || []).map(g => g.trim()).filter(Boolean)));
  return await db.album.create({
    data: {
      name: data.name,
      concept: data.concept,
      conceptRich: data.conceptRich ?? null,
      coverImage: data.coverImage ?? null,
      createdAt: data.createdAt,
      genreNames: uniqueGenres,
      status: data.status ?? "DRAFT",
      project: (data.project === 'NEXUS' ? 'NEXUS' : 'NOVA'),
      publishedAt: data.publishedAt ?? null,
      platforms: data.platforms && data.platforms.length > 0 ? {
        create: data.platforms.map(p => ({ name: p.name, url: p.url }))
      } : undefined,
    },
    select: {
      id: true,
      name: true,
      concept: true,
      conceptRich: true,
      coverImage: true,
      createdAt: true,
      genreNames: true,
      status: true,
      project: true,
      publishedAt: true,
    }
  });
}

// Obtiene álbumes paginados (sin relaciones, usa genreNames)
export async function fetchPaginatedAlbums(page: number, limit: number) {
  const skip = (page - 1) * limit;
  return await db.album.findMany({
    skip,
    take: limit,
    select: {
      id: true,
      name: true,
      concept: true,
      conceptRich: true,
      coverImage: true,
      createdAt: true,
      genreNames: true,
      status: true,
      project: true,
      publishedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}