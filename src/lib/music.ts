import db from "./db";

// Obtiene todos los álbumes con su género
export async function fetchAlbums() {
  return await db.album.findMany({
    include: { genres: true },
    orderBy: { createdAt: "desc" },
  });
}

// Elimina un álbum por ID
export async function deleteAlbum(id: string) {
  return await db.album.delete({ where: { id } });
}

// Crea un nuevo álbum (múltiples géneros)
export async function createAlbum(data: {
  name: string;
  concept: string;
  coverImage?: string;
  createdAt: Date;
  genreIds: string[]; // <- array
  status?: "DRAFT" | "PUBLISHED";
}) {
  return await db.album.create({
    data: {
      name: data.name,
      concept: data.concept,
      coverImage: data.coverImage ?? null,
      createdAt: data.createdAt,
      genres: { connect: data.genreIds.map((id) => ({ id })) },
      status: data.status ?? "DRAFT",
    },
    include: { genres: true },
  });
}

// Obtiene álbumes paginados
export async function fetchPaginatedAlbums(page: number, limit: number) {
  const skip = (page - 1) * limit;
  return await db.album.findMany({
    skip,
    take: limit,
    include: { genres: true },
    orderBy: { createdAt: "desc" },
  });
}