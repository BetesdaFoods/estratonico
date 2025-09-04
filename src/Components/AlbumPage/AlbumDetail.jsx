export default function AlbumDetail(album) {
  if (!album || !album.name) {
    return (
      <div className="text-gray-400 italic p-8">
        Completa la información del álbum para previsualizarla aquí.
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Portada */}
      <div className="mb-6 flex justify-center">
        {album.coverImage ? (
          <img
            src={album.coverImage}
            alt="Portada del álbum"
            className="w-64 h-64 object-cover rounded-3xl"
          />
        ) : (
          <div className="w-64 h-64 flex items-center justify-center border rounded-3xl text-center text-gray-400">
            Sin portada
          </div>
        )}
      </div>

      {/* Estado */}
      <div className="text-right text-purple-400 mb-2">
        Estado <b>*{album.status || "Borrador"}*</b>
      </div>

      {/* Nombre */}
      <h1 className="text-3xl font-bold mb-2">{album.name}</h1>
      <div className="text-purple-400 mb-4">{album.name ? null : "Lorem ipsum"}</div>

      {/* Fecha de creación */}
      <h2 className="text-2xl font-bold mb-1">Fecha de creación</h2>
      <div className="mb-4">
        {album.createdAt
          ? new Date(album.createdAt).toLocaleDateString()
          : "dd/mm/aaaa"}
      </div>

      {/* Concepto */}
      <h3 className="font-bold text-lg mb-1">Reseña/Concepto del álbum</h3>
      <div className="mb-4">
        {album.concept || (
          <span className="text-gray-400">
            Escribe una reseña o concepto para el álbum.
          </span>
        )}
      </div>

      {/* Género */}
      <h3 className="font-bold text-lg mb-1">Género musical</h3>
      <div>
        {album.genre?.name || (
          <span className="text-gray-400">Selecciona un género</span>
        )}
      </div>
    </div>
  );
}