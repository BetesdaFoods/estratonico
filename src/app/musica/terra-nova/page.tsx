"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { only } from "node:test";

type Genre = { id: string; name: string };

type Album = {
  id: string;
  name: string;
  concept: string | null;
  coverImage?: string | null;
  createdAt: string | Date;
  genres?: Genre[];
  project?: "NOVA" | "NEXUS";
};

type Song = {
  id: string;
  name: string;
  duration: number | string; // segundos o "mm:ss"
  album: {
    id: string;
    name: string;
    coverImage?: string | null;
    createdAt: string | Date;
    genres?: Genre[];
    project?: "NOVA" | "NEXUS";
  };
};

const monthEs = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
function formatDateEs(date: string | Date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const mon = monthEs[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${mon}, ${year}`;
}

function formatDuration(d: number | string) {
  const toSec = (val: number | string) => {
    if (typeof val === "number") return val;
    const m = String(val).match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
    if (!m) return 0;
    const mm = Number(m[1]) || 0;
    const ss = Number(m[2]) || 0;
    const hh = Number(m[3]) || 0;
    return hh > 0 ? hh * 3600 + mm * 60 + ss : mm * 60 + ss;
  };
  let total = toSec(d);
  const hh = Math.floor(total / 3600);
  total %= 3600;
  const mm = Math.floor(total / 60);
  const ss = total % 60;
  if (hh > 0) return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

export default function TerraNovaPage() {
  // Álbumes (solo NOVA)
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);
  const [q, setQ] = useState("");
  const [year, setYear] = useState<string>("");
  const [visible, setVisible] = useState(4); // mostrar 4 álbumes

  // Canciones (solo NOVA)
  const [songs, setSongs] = useState<Song[]>([]);
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [qSong, setQSong] = useState("");
  const [yearSong, setYearSong] = useState<string>("");
  const [visibleSongs, setVisibleSongs] = useState(6);

  // Fetch álbumes (intenta pedir solo NOVA al API y de todas formas filtra en cliente)
  useEffect(() => {
    let isMounted = true;
    setLoadingAlbums(true);
    fetch("/api/albums?project=NOVA")
      .then((r) => r.json())
      .then((data) => {
        if (!isMounted) return;
        const arr: Album[] = Array.isArray(data) ? data : [];
        const onlyNova = arr.filter((a) => (a.project ? a.project === "NOVA" : true));
        setAlbums(onlyNova);
      })
      .catch(() => setAlbums([]))
      .finally(() => setLoadingAlbums(false));
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch canciones (intenta pedir solo NOVA y con álbum; si no, filtra en cliente)
  useEffect(() => {
    let isMounted = true;
    setLoadingSongs(true);
    fetch("/api/songs")
      .then((r) => r.json())
      .then((data) => {
        if (!isMounted) return;
        const arr: Song[] = Array.isArray(data) ? data : [];
        const withAlbum = arr.filter((s) => s.album && s.album.id);
        const onlyNova = withAlbum.filter((s) => (s.album.project ? s.album.project === "NOVA" : true));
        setSongs(onlyNova);
      })
      .catch(() => setSongs([]))
      .finally(() => setLoadingSongs(false));
    return () => {
      isMounted = false;
    };
  }, []);

  // Años para filtros
  const years = useMemo(() => {
    const ys = new Set<number>();
    for (const a of albums) ys.add(new Date(a.createdAt).getFullYear());
    return Array.from(ys).sort((a, b) => b - a);
  }, [albums]);

  const yearsSongs = useMemo(() => {
    const ys = new Set<number>();
    for (const s of songs) ys.add(new Date(s.album.createdAt).getFullYear());
    return Array.from(ys).sort((a, b) => b - a);
  }, [songs]);

  // Filtros
  const filteredAlbums = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return albums.filter((a) => {
      const okNova = a.project ? a.project === "NOVA" : true;
      const okQ = ql ? a.name.toLowerCase().includes(ql) : true;
      const okY = year ? new Date(a.createdAt).getFullYear().toString() === year : true;
      return okNova && okQ && okY;
    });
  }, [albums, q, year]);

  const filteredSongs = useMemo(() => {
    const ql = qSong.trim().toLowerCase();
    return songs.filter((s) => {
      const okNova = s.album?.project ? s.album.project === "NOVA" : true;
      const okQ = ql ? s.name.toLowerCase().includes(ql) : true;
      const okY = yearSong ? new Date(s.album.createdAt).getFullYear().toString() === yearSong : true;
      return okNova && okQ && okY;
    });
  }, [songs, qSong, yearSong]);

  const visibleAlbums = filteredAlbums.slice(0, visible);
  const visibleSongsList = filteredSongs.slice(0, visibleSongs);

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-16 px-4 md:px-10">
      {/* Header Álbumes */}
      <header className="max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between gap-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide text-sky-400 uppercase">
            Álbumes
          </h1>

          {/* Search + Year Álbumes */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setVisible(4);
                }}
                placeholder="Buscar álbum"
                className="pl-10 pr-3 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-sky-500"
              />
              <svg
                className="w-5 h-5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="M21 21l-3.5-3.5" strokeWidth="2" />
              </svg>
            </div>

            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setVisible(4);
              }}
              className="py-2 pl-3 pr-8 rounded-full bg-zinc-900 border border-zinc-700 text-sm focus:outline-none focus:border-sky-500"
            >
              <option value="">Año</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Lista Álbumes */}
      <section className="max-w-6xl mx-auto mt-8 space-y-6">
        {loadingAlbums && <div className="text-zinc-400">Cargando álbumes…</div>}

        {!loadingAlbums && visibleAlbums.length === 0 && (
          <div className="text-zinc-400">No se encontraron álbumes.</div>
        )}

        {visibleAlbums.map((a) => {
          const genreText = (a.genres || []).map((g) => g.name).filter(Boolean).join(", ") || "—";
          const dateText = formatDateEs(a.createdAt);
          return (
            <article
              key={a.id}
              className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-800/70 to-zinc-700/40 p-4 md:p-5 flex items-center gap-4 md:gap-6"
            >
              <div className="w-[96px] h-[96px] md:w-[112px] md:h-[112px] rounded-xl overflow-hidden flex-shrink-0 bg-zinc-900 border border-zinc-700">
                {a.coverImage ? (
                  <Image
                    src={a.coverImage}
                    alt={a.name}
                    width={224}
                    height={224}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-zinc-500 text-sm">—</div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-lg md:text-xl leading-tight">{a.name}</h3>
                <div className="text-xs md:text-sm text-zinc-300 mt-1">
                  {dateText} • {genreText}
                </div>
                {a.concept && (
                  <p className="text-sm text-zinc-200/90 mt-2 line-clamp-2">
                    {a.concept}
                  </p>
                )}
              </div>

              <div className="flex-shrink-0">
                <Link
                  href={`/musica/album/${a.id}`}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black grid place-items-center hover:scale-105 transition"
                  title="Ver álbum"
                >
                  ▶
                </Link>
              </div>
            </article>
          );
        })}

        {/* Ver más Álbumes */}
        {!loadingAlbums && filteredAlbums.length > visible && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setVisible((v) => v + 4)}
              className="px-6 py-2 rounded-xl border border-zinc-700 text-sm hover:border-sky-500 hover:text-sky-400"
            >
              Ver más
            </button>
          </div>
        )}
      </section>

      {/* Canciones */}
      <section className="max-w-6xl mx-auto mt-16 space-y-6">
        {/* Header Canciones */}
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-wide text-sky-400 uppercase">
            Canciones
          </h2>

          {/* Search + Year Canciones */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                value={qSong}
                onChange={(e) => {
                  setQSong(e.target.value);
                  setVisibleSongs(6);
                }}
                placeholder="Buscar canción"
                className="pl-10 pr-3 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-sky-500"
              />
              <svg
                className="w-5 h-5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="M21 21l-3.5-3.5" strokeWidth="2" />
              </svg>
            </div>

            <select
              value={yearSong}
              onChange={(e) => {
                setYearSong(e.target.value);
                setVisibleSongs(6);
              }}
              className="py-2 pl-3 pr-8 rounded-full bg-zinc-900 border border-zinc-700 text-sm focus:outline-none focus:border-sky-500"
            >
              <option value="">Año</option>
              {yearsSongs.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loadingSongs && <div className="text-zinc-400">Cargando canciones…</div>}

        {!loadingSongs && visibleSongsList.length === 0 && (
          <div className="text-zinc-400">No se encontraron canciones.</div>
        )}

        {visibleSongsList.map((s) => {
          const dateText = formatDateEs(s.album.createdAt);
          const genreText =
            (s.album.genres || []).map((g) => g.name).filter(Boolean).join(", ") || "—";
          return (
            <article
              key={s.id}
              className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-800/70 to-zinc-700/40 p-4 md:p-5 flex items-center gap-4 md:gap-6"
            >
              <div className="w-[96px] h-[96px] md:w-[112px] md:h-[112px] rounded-xl overflow-hidden flex-shrink-0 bg-zinc-900 border border-zinc-700">
                {s.album.coverImage ? (
                  <Image
                    src={s.album.coverImage}
                    alt={s.album.name}
                    width={224}
                    height={224}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-zinc-500 text-sm">—</div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-lg md:text-xl leading-tight">{s.name}</h3>
                <div className="text-xs md:text-sm text-zinc-300 mt-1">
                  {dateText} • {genreText}
                </div>
                <div className="text-sm text-zinc-200/90 mt-2 italic">*{s.album.name}*</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-sm md:text-base text-zinc-200 tabular-nums">
                  {formatDuration(s.duration || 0)}
                </div>
                <button
                  type="button"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black grid place-items-center hover:scale-105 transition"
                  title="Reproducir"
                >
                  ▶
                </button>
              </div>
            </article>
          );
        })}

        {/* Ver más Canciones */}
        {!loadingSongs && filteredSongs.length > visibleSongs && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setVisibleSongs((v) => v + 6)}
              className="px-6 py-2 rounded-xl border border-zinc-700 text-sm hover:border-sky-500 hover:text-sky-400"
            >
              Ver más
            </button>
          </div>
        )}
      </section>
    </main>
  );
}