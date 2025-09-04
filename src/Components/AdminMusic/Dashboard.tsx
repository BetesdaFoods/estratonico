"use client";

type Album = {
  id: string;
  name: string;
  concept: string;
  coverImage?: string;
  createdAt: string;
  status: "DRAFT" | "PUBLISHED";
  genre: { name: string };
};

type Props = {
  initialAlbums: Album[];
  // Server Action que recibes desde la página
  deleteAlbumAction: (formData: FormData) => Promise<{ success: boolean; message?: string }>;
};

export default function Dashboard({ initialAlbums, deleteAlbumAction }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {initialAlbums.map((album) => (
        <div key={album.id} className="flex items-center justify-between border-b py-3">
          <div className="flex items-center gap-3">
            {album.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={album.coverImage} alt={album.name} className="w-12 h-12 rounded object-cover" />
            ) : (
              <div className="w-12 h-12 rounded bg-gray-200" />
            )}
            <div className="flex flex-col">
              <span className="font-semibold">{album.name}</span>
              <span className="text-xs text-gray-500">{album.genre.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs">{new Date(album.createdAt).toLocaleDateString()}</span>
            <span className="text-xs px-2 py-0.5 rounded border">
              {album.status === "PUBLISHED" ? "Publicado" : "Borrador"}
            </span>

            {/* Usar Server Action vía form action */}
            <form action={async (fd) => { await deleteAlbumAction(fd); }}>
              <input type="hidden" name="id" value={album.id} />
              <button type="submit" className="text-red-600 hover:underline">Eliminar</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}