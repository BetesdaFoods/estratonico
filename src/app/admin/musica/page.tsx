import { fetchAlbums, deleteAlbum } from "@/lib/music";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import Image from "next/image";

// Server Action: recibe FormData y retorna void
async function deleteAlbumAction(formData: FormData) {  
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) return;
  try {
    await deleteAlbum(id);
    revalidatePath("/admin/musica");
  } catch (error) {
    console.error("Error deleting album:", error);
  }
}

type Status = "DRAFT" | "PUBLISHED";

type DashboardAlbum = {
  id: string;
  name: string;
  concept: string;
  conceptRich?: any;
  coverImage?: string;
  createdAt: string;
  status: Status;
  genreNames: string[];
};

function formatDate(iso: string) {
  const d = new Date(iso);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

export default async function Page() {
  const albums = await fetchAlbums();

  const initialAlbums: DashboardAlbum[] = (albums || []).map((album: any) => {
    const genreNames: string[] = Array.isArray(album.genreNames)
      ? album.genreNames.filter((g: any) => typeof g === 'string' && g.trim())
      : Array.isArray(album.genres)
        ? album.genres.map((g: any) => g?.name).filter((n: any) => typeof n === 'string' && n.trim())
        : [];
    const createdAtStr = typeof album.createdAt === 'string' ? album.createdAt : new Date(album.createdAt).toISOString();
    const status: Status = album.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT';
    return {
      id: album.id,
      name: album.name,
      concept: album.concept,
      conceptRich: album.conceptRich,
      coverImage: album.coverImage ?? undefined,
      createdAt: createdAtStr,
      status,
      genreNames,
    } as DashboardAlbum;
  });

  function renderConcept(a: any) {
    if (a.conceptRich) {
      try {
        // TipTap JSON -> HTML simple (bold, italic, bullet/ordered list, paragraph)
        const json = typeof a.conceptRich === 'string' ? JSON.parse(a.conceptRich) : a.conceptRich;
        if (!json || !json.content) return a.concept || '';
        const html = json.content.map((node: any) => {
          if (node.type === 'paragraph') {
            const inner = (node.content || []).map((c: any) => nodeToHtml(c)).join('');
            if (!inner.trim()) return '';
            return `<p>${inner}</p>`;
          }
          if (node.type === 'bulletList') {
            const items = (node.content||[]).map((li: any)=> `<li>${(li.content||[]).map((liC:any)=>liC.type==='paragraph'?(liC.content||[]).map((x:any)=>nodeToHtml(x)).join(''): '').join('')}</li>`).join('');
            return `<ul>${items}</ul>`;
          }
          if (node.type === 'orderedList') {
            const items = (node.content||[]).map((li: any)=> `<li>${(li.content||[]).map((liC:any)=>liC.type==='paragraph'?(liC.content||[]).map((x:any)=>nodeToHtml(x)).join(''): '').join('')}</li>`).join('');
            return `<ol>${items}</ol>`;
          }
          return '';
        }).join('').trim();
        return html || a.concept || '';
      } catch { return a.concept || ''; }
    }
    return a.concept || '';
  }

  function nodeToHtml(node: any): string {
    if (!node) return '';
    if (node.type === 'text') {
      let text = escapeHtml(node.text || '');
      if (node.marks) {
        node.marks.forEach((m: any) => {
          if (m.type === 'bold') text = `<strong>${text}</strong>`;
          if (m.type === 'italic') text = `<em>${text}</em>`;
        });
      }
      return text;
    }
    return '';
  }
  function escapeHtml(str: string) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  return (
    <section className="min-h-[1300px] h-screen flex flex-col pt-36 pb-6 px-6 md:px-16 bg-grayBackground">
      <div className="flex-1 flex flex-col min-h-0">
        {/* Contenedor ahora negro */}
        <div className="bg-black text-white px-6 md:px-12 rounded-[2rem] flex flex-col h-full">
          {/* Header: título izquierda + botón derecha */}
          <div className="flex items-center justify-between my-8">
            <h2 className="uppercase text-2xl md:text-3xl font-bold">ÁLBUMES</h2>
            <Link
              href="/admin/musica/crear"
              className="inline-block bg-white text-black font-semibold uppercase text-sm md:text-base py-3 px-8 rounded-[0.75rem] hover:bg-gray-100 transition"
            >
              Agregar álbum
            </Link>
          </div>

          <ul className="flex flex-col gap-6 mb-12">
            {initialAlbums.map((a) => (
              <li
                key={a.id}
                className="rounded-[1.5rem] border border-gray-200 shadow-sm hover:shadow-md transition bg-white text-black"
              >
                <div className="grid grid-cols-[72px_1fr_auto] md:grid-cols-[96px_1fr_auto] gap-4 md:gap-6 p-4 md:p-6 items-center">
                  {/* Cover */}
                  <div className="w-18 h-18 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-100 border">
                    {a.coverImage ? (
                      <Image
                        src={a.coverImage}
                        alt={a.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-gray-400 text-sm">—</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg md:text-xl truncate">{a.name}</h3>
                    </div>
                    <div className="mt-1 text-sm text-gray-500 truncate">{(a.genreNames && a.genreNames.length > 0) ? a.genreNames.join(', ') : '—'}</div>
                    {a.concept && (
                      <div className="mt-2 text-xs md:text-sm text-gray-600 line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{__html: renderConcept(a)}} />
                    )}
                  </div>

                  {/* Meta + acciones */}
                  <div className="flex flex-col items-end gap-2 md:gap-3">
                    <div className="text-xs md:text-sm text-gray-500">{formatDate(a.createdAt)}</div>
                    <div
                      className={`text-[10px] md:text-xs px-2 py-1 rounded-full ${
                        a.status === "PUBLISHED"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {a.status === "PUBLISHED" ? "Publicado" : "Borrador"}
                    </div>

                    <div className="flex items-center gap-4 mt-1">
                      <Link
                        href={`/admin/musica/actualizar/${a.id}`}
                        className="text-purple-400 hover:text-purple-300 text-sm"
                      >
                        Editar
                      </Link>

                      <form action={deleteAlbumAction}>
                        <input type="hidden" name="id" value={a.id} />
                        <button
                          type="submit"
                          className="text-red-500 hover:text-red-400 text-sm"
                          aria-label={`Eliminar ${a.name}`}
                        >
                          Eliminar
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </li>
            ))}

            {initialAlbums.length === 0 && (
              <li className="text-sm text-gray-400 pb-12">No hay álbumes todavía.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}