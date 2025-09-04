"use client";

import { useState, useEffect, JSX } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
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

type SongDraft = {
  id: string;
  name: string;
  duration: string; // mm:ss
  lyrics: string;
  links: { name: string; url: string }[];
};
const SONG_PLATFORMS = Object.keys(PLATFORM_ICONS);

// Helpers
function formatDateInput(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}
function parseDDMMYYYY(s: string): Date | null {
  const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const d = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const y = Number(m[3]);
  const dt = new Date(y, mo, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== d) return null;
  return dt;
}
function formatDurationInput(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 4); // mmss
  const mm = digits.slice(0, Math.min(2, digits.length));
  const ss = digits.length > 2 ? digits.slice(2, 4) : "";
  return ss ? `${mm.padStart(2, "0")}:${ss.padStart(2, "0")}` : mm;
}

// Convierte fecha/hora ingresada como UTC-4 a un Date UTC
function toUTCFromUTCMinus4(dateStr: string, timeStr: string): Date | null {
  if (!dateStr || !timeStr) return null;
  const [y, m, d] = dateStr.split("-").map((n) => Number(n));
  const [hh, mm] = timeStr.split(":").map((n) => Number(n));
  if ([y, m, d, hh, mm].some((v) => Number.isNaN(v))) return null;
  // Interpretar la hora como UTC-4 (sumar 4h para llevar a UTC)
  const utcMs = Date.UTC(y, (m || 1) - 1, d || 1, (hh || 0) + 4, mm || 0, 0, 0);
  return new Date(utcMs);
}

export default function Page() {
  const router = useRouter();

  // Tabs
  const [tab, setTab] = useState<"general" | "tracklist">("general");

  // Universo (interruptor izquierda/derecha)
  const [universe, setUniverse] = useState<Universe>("NOVA");

  // Programación de publicación (interruptor)
  const [scheduleOn, setScheduleOn] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<string>(""); // YYYY-MM-DD
  const [scheduleTime, setScheduleTime] = useState<string>(""); // HH:MM

  // Portada + datos
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

  // Plataformas del álbum
  const [platformLinks, setPlatformLinks] = useState<PlatformLink[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  // Tracklist state
  const [songs, setSongs] = useState<SongDraft[]>([]);
  const [songEditorOpen, setSongEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [songForm, setSongForm] = useState<SongDraft>({
    id: "",
    name: "",
    duration: "00:00",
    lyrics: "",
    links: [],
  });

  // Cargar géneros
  useEffect(() => {
    axios.get("/api/genres").then((res) => setGenres(res.data));
  }, []);

  // Preview de portada
  useEffect(() => {
    if (coverImage) {
      const url = URL.createObjectURL(coverImage);
      setCoverPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setCoverPreview(null);
  }, [coverImage]);

  // Subir portada y devolver URL (Vercel Blob)
  const uploadCover = async (): Promise<string | null> => {
    if (!coverImage) return coverPreview || null;
    const fd = new FormData();
    fd.append("file", coverImage);
    const { data } = await axios.put("/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data?.url ?? null; // URL de Vercel Blob
  };

  // Crear nuevo género rápido
  const handleAddGenre = async () => {
    if (!newGenre.trim()) return;
    const res = await axios.post(
      "/api/genres",
      { name: newGenre.trim() },
      { headers: { "Content-Type": "application/json" } }
    );
    setGenres((prev) => [...prev, res.data]);
    setSelectedGenreIds((prev) => [...prev, res.data.id]);
    setShowAddGenre(false);
    setNewGenre("");
  };

  // Plataformas álbum
  const handleAddPlatform = () => {
    if (selectedPlatform && !platformLinks.find((l) => l.name === selectedPlatform)) {
      setPlatformLinks((prev) => [...prev, { name: selectedPlatform, url: "" }]);
      setSelectedPlatform("");
    }
  };
  const handleRemoveLink = (idx: number) => setPlatformLinks(platformLinks.filter((_, i) => i !== idx));

  // Helpers Tracklist
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
    const payload: SongDraft = {
      ...songForm,
      id: songForm.id || `tmp_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      duration: /^\d{2}:\d{2}$/.test(songForm.duration)
        ? songForm.duration
        : formatDurationInput(songForm.duration || "00:00").padStart(5, "0"),
      links: (songForm.links || []).filter((l) => l.name && l.url),
    };
    if (!payload.name.trim()) return;
    if (editingIndex === null) setSongs((p) => [...p, payload]);
    else {
      const next = [...songs];
      next[editingIndex] = payload;
      setSongs(next);
    }
    setSongEditorOpen(false);
  };
  const deleteSong = (idx: number) => setSongs((p) => p.filter((_, i) => i !== idx));

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

  // Enviar álbum (draft o publish)
  const submitAlbum = async (mode: "draft" | "publish") => {
    const createdAtDate = parseDDMMYYYY(createdAt);
    if (!name || !createdAtDate || !concept || selectedGenreIds.length === 0) {
      alert("Completa todos los campos obligatorios. La fecha debe ser dd/mm/yyyy y al menos un género.");
      return;
    }

    // Validación de programación si el switch está activo
    if (scheduleOn && (!scheduleDate || !scheduleTime)) {
      alert("Para programar la publicación, indica fecha y hora (UTC-4).");
      return;
    }

    try {
      const coverImageUrl = await uploadCover();

      let publishedAt: Date | null = null;
      if (mode === "publish") {
        publishedAt = scheduleOn ? buildPublishedAt() : new Date();
        if (scheduleOn && !publishedAt) return; // buildPublishedAt ya alertó
      } else {
        // Borrador con fecha tentativa (si está activo)
        publishedAt = scheduleOn ? buildPublishedAt() : null;
        if (scheduleOn && !publishedAt) return;
      }

      const payload = {
        name,
        concept,
        coverImage: coverImageUrl,
        createdAt: createdAtDate,
        genreIds: selectedGenreIds,
        status: mode === "publish" ? "PUBLISHED" : "DRAFT",
        platforms: platformLinks.filter((l) => l.name && l.url),
        project: universe, // NOVA | NEXUS
        publishedAt,
      };

      const { data: album } = await axios.post("/api/albums", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (songs.length > 0) {
        const toSend = songs.map((s) => ({
          name: s.name,
          duration: s.duration, // mm:ss
          lyrics: s.lyrics,
          links: s.links,
        }));
        await axios.post(
          "/api/songs/bulk",
          { albumId: album.id, songs: toSend },
          { headers: { "Content-Type": "application/json" } }
        );
      }

      router.push("/admin/musica");
    } catch (error) {
      console.error("Error creating album or songs:", error);
      alert("Error al crear el álbum o sus canciones.");
    }
  };

  // Submit del form (guarda como borrador)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitAlbum("draft");
  };

  const getAvailablePlatforms = () => {
    const used = platformLinks.map((l) => l.name);
    return Object.keys(PLATFORM_ICONS).filter((p) => !used.includes(p));
  };
  const availableGenres = genres.filter((g) => !selectedGenreIds.includes(g.id));

  return (
    <>
      {/* Header */}
      <div className="max-w-4xl mx-auto mt-28 md:mt-32 mb-3 px-2 md:px-0 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <button
              type="button"
              className={`border px-3 py-1 rounded text-xs ${tab === "general" ? "font-semibold border-purple-500 text-purple-600" : ""}`}
              onClick={() => setTab("general")}
            >
              INFORMACIÓN GENERAL
            </button>
            <button
              type="button"
              className={`border px-3 py-1 rounded text-xs ${tab === "tracklist" ? "font-semibold border-purple-500 text-purple-600" : ""}`}
              onClick={() => setTab("tracklist")}
            >
              TRACKLIST
            </button>

            {/* Universo: interruptor segmentado (izq: Nova, der: Nexus) */}
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
            {/* Botón publicar ahora o con programación */}
            <button
              type="button"
              className="border px-4 py-1 rounded font-bold text-xs"
              onClick={() => submitAlbum("publish")}
              disabled={scheduleOn && (!scheduleDate || !scheduleTime)}
              title={scheduleOn && (!scheduleDate || !scheduleTime) ? "Selecciona fecha y hora (UTC-4)" : "Publicar"}
            >
              PUBLICAR
            </button>
          </div>
        </div>

        {/* Interruptor Programar publicación + inputs cuando está activo */}
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
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${scheduleOn ? "translate-x-5" : "translate-x-1"}`}
              />
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
          id="albumForm"
          onSubmit={handleSubmit}
          className="bg-white rounded-[1.5rem] p-6 max-w-4xl mx-auto flex flex-col gap-4 shadow-md"
        >
          {/* Grid principal */}
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

            {/* Nombre y Fecha */}
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

            {/* Reseña + Géneros */}
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

                  <div className="flex flex-wrap gap-2">
                    {selectedGenreIds.map((id) => {
                      const g = genres.find((x) => x.id === id);
                      if (!g) return null;
                      return (
                        <span
                          key={id}
                          className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-3 py-1 text-xs"
                        >
                          {g.name}
                          <button
                            type="button"
                            className="text-purple-700"
                            onClick={() => setSelectedGenreIds((prev) => prev.filter((x) => x !== id))}
                            aria-label={`Quitar ${g.name}`}
                            title={`Quitar ${g.name}`}
                          >
                            ×
                          </button>
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
                        <option value="">
                          {availableGenres.length === 0 ? "No hay más géneros" : "Agregar género"}
                        </option>
                        {availableGenres.map((g) => (
                          <option key={g.id} value={g.id}>
                            {g.name}
                          </option>
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
                    Agregar nuevo género
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
                      <button type="button" className="text-green-600 text-xs" onClick={handleAddGenre}>
                        Guardar
                      </button>
                      <button type="button" className="text-red-600 text-xs" onClick={() => setShowAddGenre(false)}>
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Plataformas */}
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
                      <button type="button" className="text-red-600 px-2" onClick={() => handleRemoveLink(idx)}>
                        🗑️
                      </button>
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
                      <option value="">
                        {getAvailablePlatforms().length === 0 ? "No hay más plataformas" : "Agregar plataforma"}
                      </option>
                      {getAvailablePlatforms().map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="border border-purple-400 text-purple-500 rounded px-4 py-2 text-xs font-medium hover:bg-purple-50 disabled:opacity-50"
                      onClick={handleAddPlatform}
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

      {/* Tab: Tracklist */}
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
                  <div className="text-xs text-gray-500">{song.duration || "0:00"}</div>
                  <button
                    type="button"
                    className="text-purple-600 hover:text-purple-700"
                    onClick={() => openEditSong(idx)}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => deleteSong(idx)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                  <span className="cursor-grab text-gray-400" title="Reordenar">
                    ⋮⋮
                  </span>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={openNewSong}
              className="self-start mt-2 border-2 border-dashed border-purple-400 text-purple-600 rounded-lg px-4 py-2 text-sm"
            >
              Agregar canción
            </button>
          </div>
        </div>
      )}

      {/* Botón fuera del card blanco (borrador) */}
      <div className="mt-6 mb-10 flex justify-center">
        <button
          type="submit"
          form="albumForm"
          className="relative select-none"
          aria-label="Guardar borrador"
          title="Guardar borrador"
        >
          <span className="block p-[3px] bg-white [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]">
            <span className="block bg-black text-white font-semibold tracking-wide text-sm md:text-base px-8 md:px-12 py-2 md:py-3 [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]">
              GUARDAR BORRADOR
            </span>
          </span>
        </button>
      </div>

      {/* Modal Editor de Canción */}
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