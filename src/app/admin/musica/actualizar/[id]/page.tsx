"use client";

import { useEffect, useMemo, useState, JSX } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

type Genre = { id: string; name: string };
type PlatformLink = { name: string; url: string };
type Universe = "NOVA" | "NEXUS";

const PLATFORM_ICONS: Record<string, JSX.Element> = {
  Spotify: <Image src="/assets/blacks/spotify-footer.svg" alt="Spotify" width={20} height={20} />,
  "Apple Music": <Image src="/assets/blacks/apple-footer.svg" alt="Apple Music" width={20} height={20} />,
  YouTube: <Image src="/assets/blacks/youtube-music.svg" alt="YouTube" width={20} height={20} />,
  "Amazon Music": <Image src="/assets/blacks/amazon-footer.svg" alt="Amazon Music" width={20} height={20} />,
};
const SONG_PLATFORMS = Object.keys(PLATFORM_ICONS);

type SongDraft = {
  id: string;
  name: string;
  duration: string; // mm:ss
  lyrics: string;
  links: { name: string; url: string }[];
};

function secondsToMMSS(sec: number | null | undefined) {
  const s = Math.max(0, Number(sec ?? 0) | 0);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}
function formatDateInput(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}
function parseDDMMYYYY(s: string): Date | null {
  const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const d = Number(m[1]), mo = Number(m[2]) - 1, y = Number(m[3]);
  const dt = new Date(y, mo, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== d) return null;
  return dt;
}
function toDDMMYYYY(date: string | Date) {
  const d = new Date(date);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
function formatDurationInput(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  const mm = digits.slice(0, Math.min(2, digits.length));
  const ss = digits.length > 2 ? digits.slice(2, 4) : "";
  return ss ? `${mm.padStart(2, "0")}:${ss.padStart(2, "0")}` : mm;
}

// Convierte fecha/hora ingresadas como UTC-4 a un Date en UTC
function toUTCFromUTCMinus4(dateStr: string, timeStr: string): Date | null {
  if (!dateStr || !timeStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = timeStr.split(":").map(Number);
  if ([y, m, d, hh, mm].some((v) => Number.isNaN(v))) return null;
  const utcMs = Date.UTC(y, (m || 1) - 1, d || 1, (hh || 0) + 4, mm || 0, 0, 0);
  return new Date(utcMs);
}
// Convierte un Date (UTC) a componentes de entrada en UTC-4
function fromUTCToUTCMinus4(date: string | Date): { dateStr: string; timeStr: string } {
  const d = new Date(date);
  const ms = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes());
  const minus4 = new Date(ms - 4 * 60 * 60 * 1000);
  const y = minus4.getUTCFullYear();
  const m = String(minus4.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(minus4.getUTCDate()).padStart(2, "0");
  const hh = String(minus4.getUTCHours()).padStart(2, "0");
  const mm = String(minus4.getUTCMinutes()).padStart(2, "0");
  return { dateStr: `${y}-${m}-${dd}`, timeStr: `${hh}:${mm}` };
}

export default function UpdateAlbumPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const albumId = useMemo(() => String(params?.id || ""), [params]);

  // Tabs
  const [tab, setTab] = useState<"general" | "tracklist">("general");

  // Universo
  const [universe, setUniverse] = useState<Universe>("NOVA");

  // Programación publicación
  const [scheduleOn, setScheduleOn] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<string>(""); // YYYY-MM-DD (UTC-4)
  const [scheduleTime, setScheduleTime] = useState<string>(""); // HH:MM (UTC-4)

  // Estado general del álbum
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [createdAt, setCreatedAt] = useState(""); // dd/mm/yyyy
  const [concept, setConcept] = useState("");

  // Géneros
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);
  const [genreToAdd, setGenreToAdd] = useState("");
  const [showAddGenre, setShowAddGenre] = useState(false);
  const [newGenre, setNewGenre] = useState("");

  // Plataformas (álbum)
  const [platformLinks, setPlatformLinks] = useState<PlatformLink[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  // Tracklist
  const [songs, setSongs] = useState<SongDraft[]>([]);
  const [existingSongIds, setExistingSongIds] = useState<string[]>([]);
  const [songEditorOpen, setSongEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [songForm, setSongForm] = useState<SongDraft>({ id: "", name: "", duration: "00:00", lyrics: "", links: [] });

  // Cargar catálogos y datos iniciales
  useEffect(() => {
    axios.get("/api/genres").then((res) => setGenres(res.data)).catch(() => {});
  }, []);
  useEffect(() => {
    if (!albumId) return;
    axios.get(`/api/albums/${albumId}`)
      .then((res) => {
        const a = res.data;
        setUniverse(a.project === "NEXUS" ? "NEXUS" : "NOVA");
        setName(a.name || "");
        setConcept(a.concept || "");
        if (a.coverImage) setCoverPreview(a.coverImage);
        setCreatedAt(a.createdAt ? toDDMMYYYY(a.createdAt) : "");
        // Prefill programación si existe publishedAt
        if (a.publishedAt) {
          const { dateStr, timeStr } = fromUTCToUTCMinus4(a.publishedAt);
          setScheduleOn(true);
          setScheduleDate(dateStr);
          setScheduleTime(timeStr);
        }
        // géneros
        if (Array.isArray(a.genres)) setSelectedGenreIds(a.genres.map((g: any) => g.id));
        // plataformas
        if (Array.isArray(a.platforms)) {
          setPlatformLinks(
            a.platforms
              .filter((p: any) => p?.name && p?.url)
              .map((p: any) => ({ name: String(p.name), url: String(p.url) }))
          );
        }
      })
      .catch((e) => {
        console.error("Error fetching album:", e);
        alert("No se pudo cargar el álbum.");
        router.push("/admin/musica");
      });

    // Canciones
    axios.get(`/api/songs?albumId=${albumId}`)
      .then((res) => {
        const arr = Array.isArray(res.data) ? res.data : [];
        setExistingSongIds(arr.map((s: any) => s.id));
        setSongs(
          arr.map((s: any) => ({
            id: s.id,
            name: s.name,
            duration: secondsToMMSS(s.duration),
            lyrics: s.lyrics || "",
            links: Array.isArray(s.platforms)
              ? s.platforms.map((p: any) => ({ name: p.name, url: p.url }))
              : [],
          }))
        );
      })
      .catch(() => {});
  }, [albumId, router]);

  // Preview de portada local
  useEffect(() => {
    if (coverImage) {
      const url = URL.createObjectURL(coverImage);
      setCoverPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [coverImage]);

  // Helpers géneros / plataformas
  const availableGenres = genres.filter((g) => !selectedGenreIds.includes(g.id));
  const getAvailablePlatforms = () => {
    const used = platformLinks.map((l) => l.name);
    return Object.keys(PLATFORM_ICONS).filter((p) => !used.includes(p));
  };

  // Tracklist helpers
  const openNewSong = () => {
    setEditingIndex(null);
    setSongForm({ id: "", name: "", duration: "00:00", lyrics: "", links: [] });
    setSongEditorOpen(true);
  };
  const openEditSong = (idx: number) => {
    setEditingIndex(idx);
    setSongForm({ ...songs[idx] });
    setSongEditorOpen(true);
  };
  const saveSong = () => {
    const normalized: SongDraft = {
      ...songForm,
      id: songForm.id || `tmp_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      duration: /^\d{2}:\d{2}$/.test(songForm.duration)
        ? songForm.duration
        : formatDurationInput(songForm.duration || "00:00").padStart(5, "0"),
      links: (songForm.links || []).filter((l) => l.name && l.url),
    };
    if (!normalized.name.trim()) return;
    if (editingIndex === null) setSongs((p) => [...p, normalized]);
    else {
      const next = [...songs];
      next[editingIndex] = normalized;
      setSongs(next);
    }
    setSongEditorOpen(false);
  };
  const deleteSongLocal = (idx: number) => setSongs((p) => p.filter((_, i) => i !== idx));

  // Construye publishedAt según el interruptor (UTC-4)
  const buildPublishedAt = (): Date | null => {
    if (!scheduleOn) return null;
    const dt = toUTCFromUTCMinus4(scheduleDate, scheduleTime);
    if (!dt) {
      alert("Selecciona una fecha y hora válidas para la publicación (UTC-4).");
      return null;
    }
    return dt;
  };

  // Guardar/Actualizar (draft o publish)
  const submitUpdate = async (mode: "draft" | "publish") => {
    if (!albumId) return;

    const createdAtDate = parseDDMMYYYY(createdAt);
    if (!name || !createdAtDate || !concept || selectedGenreIds.length === 0) {
      alert("Completa todos los campos obligatorios. La fecha debe ser dd/mm/yyyy y al menos un género.");
      return;
    }

    if (scheduleOn && (!scheduleDate || !scheduleTime)) {
      alert("Para programar la publicación, indica fecha y hora (UTC-4).");
      return;
    }

    // Mantén URL existente si no se cambió la portada
    const coverImageUrl = coverPreview || null;

    let publishedAt: Date | null = null;
    if (mode === "publish") {
      publishedAt = scheduleOn ? buildPublishedAt() : new Date();
      if (scheduleOn && !publishedAt) return;
    } else {
      // Borrador con fecha tentativa si está el switch
      publishedAt = scheduleOn ? buildPublishedAt() : null;
      if (scheduleOn && !publishedAt) return;
    }

    const payload: any = {
      name,
      concept,
      coverImage: coverImageUrl,
      createdAt: createdAtDate,
      genreIds: selectedGenreIds,
      platforms: platformLinks.filter((l) => l.name && l.url),
      project: universe, // NOVA | NEXUS
      status: mode === "publish" ? "PUBLISHED" : "DRAFT",
      publishedAt,
    };

    try {
      // 1) Actualizar álbum
      await axios.patch(`/api/albums/${albumId}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      // 2) Reemplazar canciones
      if (existingSongIds.length > 0) {
        await Promise.all(existingSongIds.map((sid) => axios.delete(`/api/songs/${sid}`).catch(() => null)));
      }
      if (songs.length > 0) {
        const toSend = songs.map((s) => ({
          name: s.name,
          duration: s.duration, // mm:ss (API convierte a segundos)
          lyrics: s.lyrics,
          links: s.links,
        }));
        await axios.post(
          "/api/songs/bulk",
          { albumId, songs: toSend },
          { headers: { "Content-Type": "application/json" } }
        );
      }

      router.push("/admin/musica");
    } catch (error) {
      console.error("Error updating album:", error);
      alert("Error al actualizar el álbum.");
    }
  };

  // Submit del form: guarda como borrador
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitUpdate("draft");
  };

  return (
    <>
      {/* Header tabs y acciones */}
      <div className="max-w-4xl mx-auto mt-28 md:mt-32 mb-3 px-2 md:px-0 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <button
            type="button"
            className={`border px-3 py-1 rounded text-xs ${tab === "general" ? "font-semibold border-purple-500 text-purple-600" : ""}`}
            onClick={() => setTab("general")}
          >
            INFORMACIÓN GENERAL
          </button>

          {/* Universo: interruptor segmentado */}
          <div className="ml-2">
            <div className="inline-flex rounded-full border overflow-hidden">
              <button
                type="button"
                onClick={() => setUniverse("NOVA")}
                className={`px-3 py-1 text-[11px] ${universe === "NOVA" ? "bg-purple-600 text-white" : "bg-white text-gray-700"}`}
                title="Universo Nova"
              >
                Nova
              </button>
              <button
                type="button"
                onClick={() => setUniverse("NEXUS")}
                className={`px-3 py-1 text-[11px] ${universe === "NEXUS" ? "bg-purple-600 text-white" : "bg-white text-gray-700"}`}
                title="Universo Nexus"
              >
                Nexus
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="border px-4 py-1 rounded font-bold text-xs"
            onClick={() => submitUpdate("publish")}
            disabled={scheduleOn && (!scheduleDate || !scheduleTime)}
            title={scheduleOn && (!scheduleDate || !scheduleTime) ? "Selecciona fecha y hora (UTC-4)" : "Publicar"}
          >
            PUBLICAR
          </button>
          <button type="submit" form="updateForm" className="border px-4 py-1 rounded font-bold text-xs">
            GUARDAR CAMBIOS
          </button>
        </div>
      </div>

      {/* Interruptor Programar publicación */}
      <div className="max-w-4xl mx-auto mb-3 px-2 md:px-0">
        <div className="flex flex-wrap items-center gap-3 border rounded-lg p-3 bg-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setScheduleOn((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${scheduleOn ? "bg-purple-600" : "bg-gray-300"}`}
              aria-pressed={scheduleOn}
              aria-label="Programar publicación"
              title="Programar publicación"
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${scheduleOn ? "translate-x-5" : "translate-x-1"}`} />
            </button>
            <span className="text-sm text-black">Programar publicación</span>
          </div>

          {scheduleOn && (
            <>
              <div className="flex items-center gap-2">
                <label className="text-xs text-black">Fecha</label>
                <input
                  type="date"
                  className="border rounded px-2 py-1 text-xs !text-black"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-black">Hora</label>
                <input
                  type="time"
                  className="border rounded px-2 py-1 text-xs !text-black"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                />
              </div>
              <div className="text-xs text-gray-600">Zona: UTC-4</div>
            </>
          )}
        </div>
      </div>

      {/* Tab: Información General */}
      {tab === "general" && (
        <form
          id="updateForm"
          onSubmit={handleUpdate}
          className="bg-white rounded-[1.5rem] p-6 max-w-4xl mx-auto flex flex-col gap-4 shadow-md"
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 items-start">
            {/* Portada */}
            <div className="flex flex-col items-center pt-1">
              <label className="w-52 h-52 border-2 border-dashed rounded-xl flex flex-col justify-center items-center cursor-pointer bg-gray-50">
                {coverPreview ? (
                  <img src={coverPreview} alt="Portada" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <span className="text-center text-gray-400 text-sm">
                    +<br />
                    Portada<br />
                    3000x3000px<br />
                    jpg, png, webp
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            {/* Nombre / Fecha */}
            <div className="flex flex-col gap-3 w-full max-w-lg mx-auto">
              <div className="flex flex-col gap-1 w-full">
                <label className="font-semibold text-sm text-black">Nombre del Álbum</label>
                <input
                  type="text"
                  placeholder="Nombre del Álbum"
                  className="border rounded px-3 py-1 w-full text-sm !text-black placeholder:text-gray-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="font-semibold text-sm text-black">Fecha de creación</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="dd/mm/yyyy"
                  pattern="\d{2}/\d{2}/\d{4}"
                  className="border rounded px-3 py-1 w-full text-sm !text-black placeholder:text-gray-500"
                  value={createdAt}
                  onChange={(e) => setCreatedAt(formatDateInput(e.target.value))}
                  required
                />
              </div>
            </div>

            {/* Descripción + Géneros */}
            <div className="col-span-2 w-full">
              <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <label className="font-semibold text-sm text-black">Reseña/Descripción del álbum</label>
                  <textarea
                    placeholder="Reseña/Descripción del álbum"
                    className="border rounded px-3 py-2 w-full text-sm !text-black placeholder:text-gray-500"
                    rows={4}
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    required
                  />
                </div>

                {/* Géneros múltiples */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-semibold text-sm text-black">Géneros musicales</label>

                  {/* chips */}
                  <div className="flex flex-wrap gap-2">
                    {selectedGenreIds.map((id) => {
                      const g = genres.find((x) => x.id === id);
                      if (!g) return null;
                      return (
                        <span key={id} className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-3 py-1 text-xs">
                          {g.name}
                          <button type="button" className="text-purple-700" onClick={() => setSelectedGenreIds((prev) => prev.filter((x) => x !== id))}>×</button>
                        </span>
                      );
                    })}
                  </div>

                  {/* selector + agregar */}
                  <div className="w-full flex justify-start">
                    <div className="flex items-center gap-2">
                      <select
                        className="border rounded px-3 py-2 text-xs bg-white !text-black"
                        value={genreToAdd}
                        onChange={(e) => setGenreToAdd(e.target.value)}
                        disabled={availableGenres.length === 0}
                      >
                        <option value="">{availableGenres.length === 0 ? "No hay más géneros" : "Agregar género"}</option>
                        {availableGenres.map((g) => (
                          <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="border border-purple-400 text-purple-500 rounded px-4 py-2 text-xs font-medium hover:bg-purple-50 disabled:opacity-50"
                        onClick={() => {
                          if (!genreToAdd) return;
                          setSelectedGenreIds((prev) => [...prev, genreToAdd]);
                          setGenreToAdd("");
                        }}
                        disabled={!genreToAdd}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>

                  {/* crear nuevo género */}
                  <button
                    type="button"
                    className="self-start border border-purple-400 text-purple-500 rounded px-3 py-1 text-xs font-medium hover:bg-purple-50"
                    onClick={() => setShowAddGenre(true)}
                  >
                    Agregar género
                  </button>

                  {showAddGenre && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="border rounded px-2 py-1 text-sm !text-black placeholder:text-gray-500"
                        placeholder="Nuevo género"
                        value={newGenre}
                        onChange={(e) => setNewGenre(e.target.value)}
                      />
                      <button
                        type="button"
                        className="text-green-600 text-xs"
                        onClick={async () => {
                          if (!newGenre.trim()) return;
                          const res = await axios.post("/api/genres", { name: newGenre.trim() }, { headers: { "Content-Type": "application/json" } });
                          setGenres((prev) => [...prev, res.data]);
                          setSelectedGenreIds((prev) => [...prev, res.data.id]);
                          setShowAddGenre(false);
                          setNewGenre("");
                        }}
                      >
                        Guardar
                      </button>
                      <button type="button" className="text-red-600 text-xs" onClick={() => setShowAddGenre(false)}>Cancelar</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Plataformas álbum */}
            <div className="col-span-2 w-full">
              <div className="w-full max-w-2xl mx-auto">
                {platformLinks.length === 0 && <div className="text-black font-semibold text-sm mb-2">URLs</div>}

                {platformLinks.map((link, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="text-black font-semibold text-sm mb-1">{`URL ${link.name}`}</div>
                    <div className="grid grid-cols-[44px_1fr_auto] gap-2 items-center">
                      <div className="flex justify-center items-center w-11 h-11 rounded-md border bg-white">
                        {PLATFORM_ICONS[link.name] || <span className="text-gray-400">+</span>}
                      </div>
                      <input
                        type="url"
                        placeholder="URL"
                        className="border rounded px-3 py-2 w-full text-sm !text-black placeholder:text-gray-500"
                        value={link.url}
                        onChange={(e) => {
                          const updated = [...platformLinks];
                          updated[idx].url = e.target.value;
                          setPlatformLinks(updated);
                        }}
                      />
                      <button type="button" className="text-red-600 px-2" onClick={() => setPlatformLinks((l) => l.filter((_, i) => i !== idx))}>🗑️</button>
                    </div>
                  </div>
                ))}

                {/* Agregar plataforma */}
                <div className="w-full flex justify-start mt-6">
                  <div className="flex items-center gap-2">
                    <select
                      className="border rounded px-3 py-2 text-xs bg-white !text-black"
                      value={selectedPlatform}
                      onChange={(e) => setSelectedPlatform(e.target.value)}
                      disabled={getAvailablePlatforms().length === 0}
                    >
                      <option value="">{getAvailablePlatforms().length === 0 ? "No hay más plataformas" : "Agregar plataforma"}</option>
                      {getAvailablePlatforms().map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="border border-purple-400 text-purple-500 rounded px-4 py-2 text-xs font-medium hover:bg-purple-50 disabled:opacity-50"
                      onClick={() => {
                        if (selectedPlatform && !platformLinks.find((l) => l.name === selectedPlatform)) {
                          setPlatformLinks((prev) => [...prev, { name: selectedPlatform, url: "" }]);
                          setSelectedPlatform("");
                        }
                      }}
                      disabled={!selectedPlatform}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Tracklist (si lo reactivas con tab) */}
      {tab === "tracklist" && (
        <div className="bg-white rounded-[1.5rem] p-6 max-w-4xl mx-auto flex flex-col gap-4 shadow-md">
          <div className="text-xl font-semibold">Tracklist</div>
          <div className="flex flex-col gap-3">
            {songs.map((song, idx) => (
              <div key={song.id} className="flex items-center justify-between bg-white border rounded-xl py-3 px-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 text-gray-500">{idx + 1}</div>
                  <div className="text-sm">{song.name || "Nombre de canción"}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs text-gray-500">{song.duration || "00:00"}</div>
                  <button type="button" className="text-purple-600 hover:text-purple-700" onClick={() => openEditSong(idx)} title="Editar">✏️</button>
                  <button type="button" className="text-red-600 hover:text-red-700" onClick={() => deleteSongLocal(idx)} title="Eliminar">🗑️</button>
                  <span className="cursor-grab text-gray-400" title="Reordenar">⋮⋮</span>
                </div>
              </div>
            ))}

            <button type="button" onClick={openNewSong} className="self-start mt-2 border-2 border-dashed border-purple-400 text-purple-600 rounded-lg px-4 py-2 text-sm">
              Agregar canción
            </button>
          </div>
        </div>
      )}

      {/* Botón inferior (guardar) */}
      <div className="mt-6 mb-10 flex justify-center">
        <button type="submit" form="updateForm" className="relative select-none" aria-label="Guardar cambios" title="Guardar cambios">
          <span className="block p-[3px] bg-white [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]">
            <span className="block bg-black text-white font-semibold tracking-wide text-sm md:text-base px-8 md:px-12 py-2 md:py-3 [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]">
              GUARDAR CAMBIOS
            </span>
          </span>
        </button>
      </div>

      {/* Modal de canción */}
      {songEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSongEditorOpen(false)} />
          <div className="relative bg-white rounded-2xl w-[min(900px,92vw)] max-h-[90vh] overflow-auto border-2 border-blue-400 p-4">
            <div className="text-lg font-semibold mb-2">{editingIndex === null ? "Agregar Canción" : "Editar Canción"}</div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-1">Nombre de Canción</label>
                <input
                  type="text"
                  className="border rounded px-3 py-2 w-full text-sm !text-black"
                  value={songForm.name}
                  onChange={(e) => setSongForm((s) => ({ ...s, name: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Duración</label>
                <input
                  type="text"
                  placeholder="mm:ss"
                  className="border rounded px-3 py-2 w-full text-sm !text-black"
                  value={songForm.duration}
                  onChange={(e) => setSongForm((s) => ({ ...s, duration: formatDurationInput(e.target.value) }))}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-1">Letra de Canción</label>
                <textarea
                  rows={8}
                  className="border rounded px-3 py-2 w-full text-sm !text-black"
                  value={songForm.lyrics}
                  onChange={(e) => setSongForm((s) => ({ ...s, lyrics: e.target.value }))}
                />
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-4">
                {SONG_PLATFORMS.map((p) => {
                  const idx = (songForm.links || []).findIndex((l) => l.name === p);
                  const value = idx >= 0 ? songForm.links[idx].url : "";
                  return (
                    <div key={p}>
                      <div className="text-black font-semibold text-sm mb-1">{`URL ${p}`}</div>
                      <div className="grid grid-cols-[44px_1fr] gap-2 items-center">
                        <div className="flex justify-center items-center w-11 h-11 rounded-md border bg-white">
                          {PLATFORM_ICONS[p]}
                        </div>
                        <input
                          type="url"
                          placeholder="URL"
                          className="border rounded px-3 py-2 w-full text-sm !text-black placeholder:text-gray-500"
                          value={value}
                          onChange={(e) => {
                            const url = e.target.value;
                            setSongForm((s) => {
                              const links = [...(s.links || [])];
                              const i = links.findIndex((l) => l.name === p);
                              if (i >= 0) links[i] = { name: p, url };
                              else links.push({ name: p, url });
                              return { ...s, links };
                            });
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button type="button" className="px-4 py-2 text-sm border rounded" onClick={() => setSongEditorOpen(false)}>
                Cancelar
              </button>
              <button type="button" className="px-4 py-2 text-sm bg-black text-white rounded" onClick={saveSong}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}