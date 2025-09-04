import { useState } from "react";
import type { AlbumWithRelations, GenreType } from "@/lib/definitions";

type Props = {
  setAlbum: React.Dispatch<React.SetStateAction<Partial<AlbumWithRelations>>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function NewAlbumForm({ setAlbum, onSubmit }: Props) {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [concept, setConcept] = useState("");
  const [genre, setGenre] = useState<GenreType | null>(null);
  const [genres, setGenres] = useState<GenreType[]>([
    // Puedes cargar esto desde la API
    { id: "1", name: "Rock" },
    { id: "2", name: "Pop" },
  ]);
  const [showAddGenre, setShowAddGenre] = useState(false);
  const [newGenre, setNewGenre] = useState("");

  // Actualiza el estado del álbum en el padre
  function updateParent() {
    setAlbum(prev => ({
        ...prev,
        name,
        concept,
        coverImage: coverImage ? URL.createObjectURL(coverImage) : undefined,
        createdAt: createdAt ? new Date(createdAt) : undefined,
        genre: genre ?? undefined,
    }));
    }

  // Llama updateParent cada vez que cambie algo relevante
  // (puedes optimizar con useEffect si lo prefieres)

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 p-8">
      {/* Portada */}
      <label className="flex flex-col items-center border rounded-3xl p-8 w-64 h-64 justify-center self-center">
        {coverImage ? (
          <img src={URL.createObjectURL(coverImage)} alt="Portada" className="w-full h-full object-cover rounded-3xl" />
        ) : (
          <span className="text-center text-gray-500">Lorem Ipsum<br />recomendado<br />3000x3000px<br />formato jpg, png, web</span>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0] || null;
            setCoverImage(file);
            setTimeout(updateParent, 0);
          }}
        />
        <button type="button" onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()} className="mt-2 underline text-sm">Subir portada</button>
      </label>

      {/* Nombre del álbum */}
      <label>
        <span className="font-bold text-lg">Nombre del álbum</span>
        <input
          type="text"
          className="block w-full border rounded p-2 mt-1"
          value={name}
          onChange={e => { setName(e.target.value); setTimeout(updateParent, 0); }}
          required
        />
      </label>

      {/* Fecha de creación */}
      <label>
        <span className="font-bold text-lg">Fecha de creación</span>
        <input
          type="date"
          className="block w-full border rounded p-2 mt-1"
          value={createdAt}
          onChange={e => { setCreatedAt(e.target.value); setTimeout(updateParent, 0); }}
          required
        />
      </label>

      {/* Reseña/Concepto */}
      <label>
        <span className="font-bold text-lg">Reseña/Concepto del álbum</span>
        <textarea
          className="block w-full border rounded p-2 mt-1"
          rows={4}
          value={concept}
          onChange={e => { setConcept(e.target.value); setTimeout(updateParent, 0); }}
        />
      </label>

      {/* Género musical */}
      <label>
        <span className="font-bold text-lg">Género musical</span>
        <select
          className="block w-full border rounded p-2 mt-1"
          value={genre?.id || ""}
          onChange={e => {
            const selected = genres.find(g => g.id === e.target.value) || null;
            setGenre(selected);
            setTimeout(updateParent, 0);
          }}
        >
          <option value="">Selecciona un género</option>
          {genres.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        <button
          type="button"
          className="mt-2 text-purple-500 flex items-center gap-1"
          onClick={() => setShowAddGenre(true)}
        >
          <span>＋</span> Agregar género
        </button>
      </label>

      {/* Modal/agregar género */}
      {showAddGenre && (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            className="border rounded p-1"
            placeholder="Nuevo género"
            value={newGenre}
            onChange={e => setNewGenre(e.target.value)}
          />
          <button
            type="button"
            className="text-green-600"
            onClick={() => {
              if (newGenre.trim()) {
                const newG = { id: Date.now().toString(), name: newGenre.trim() };
                setGenres([...genres, newG]);
                setGenre(newG);
                setNewGenre("");
                setShowAddGenre(false);
                setTimeout(updateParent, 0);
              }
            }}
          >
            Guardar
          </button>
          <button type="button" className="text-red-600" onClick={() => setShowAddGenre(false)}>Cancelar</button>
        </div>
      )}

      {/* Botón para publicar */}
      <button type="submit" className="mt-6 bg-black text-white rounded px-6 py-2 self-end">
        Publicar
      </button>
    </form>
  );
}