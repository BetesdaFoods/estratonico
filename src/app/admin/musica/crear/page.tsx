"use client";

import { useState, useEffect, JSX } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type Genre = { id: string; name: string };
type PlatformLink = { name: string; url: string }
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
  lyrics: string; // plain / HTML fallback
  lyricsRich?: any; // TipTap JSON
  links: { name: string; url: string }[];
};
const SONG_PLATFORMS = Object.keys(PLATFORM_ICONS);

// Helpers (remove manual dd/mm/yyyy formatter & parser; use native date input)
// function formatDateInput(raw: string) { ... } // removed
// function parseDDMMYYYY(s: string): Date | null { ... } // removed
function parseYYYYMMDD(s: string): Date | null {
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  const dt = new Date(y, mo, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== d) return null;
  return dt;
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

// Helper duración mm:ss
function formatDurationInput(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 4); // mmss
  const mm = digits.slice(0, Math.min(2, digits.length));
  const ss = digits.length > 2 ? digits.slice(2, 4) : "";
  return ss ? `${mm.padStart(2, "0")}:${ss.padStart(2, "0")}` : mm;
}

// Rich Text Editor reusable
function RichTextEditor({ value, onChange, placeholder, minHeight = '180px' }: { value: any; onChange: (json: any, html: string, text: string) => void; placeholder?: string; minHeight?: string; }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || null,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON(), editor.getHTML(), editor.getText());
    },
    editorProps: {
      attributes: {
        // Aseguramos texto negro para que no herede text-white global
        class: 'prose prose-sm max-w-none focus:outline-none px-3 py-2 text-black',
      },
    },
  });

  const showPlaceholder = !editor?.isFocused && editor?.getText().length === 0;

  return (
    <div className="border rounded bg-white text-black">
      <div className="flex flex-wrap gap-1 border-b px-2 py-1 bg-gray-100 text-xs">
        <button type="button" onMouseDown={(e)=>{e.preventDefault(); editor?.chain().focus().toggleBold().run();}} className={`px-2 py-1 rounded text-gray-700 ${editor?.isActive('bold') ? 'bg-purple-600 text-white' : 'hover:bg-gray-200'}`}>B</button>
        <button type="button" onMouseDown={(e)=>{e.preventDefault(); editor?.chain().focus().toggleItalic().run();}} className={`px-2 py-1 rounded italic text-gray-700 ${editor?.isActive('italic') ? 'bg-purple-600 text-white' : 'hover:bg-gray-200'}`}>I</button>
        <button type="button" onMouseDown={(e)=>{e.preventDefault(); editor?.chain().focus().undo().run();}} className="px-2 py-1 rounded text-gray-700 hover:bg-gray-200">↺</button>
        <button type="button" onMouseDown={(e)=>{e.preventDefault(); editor?.chain().focus().redo().run();}} className="px-2 py-1 rounded text-gray-700 hover:bg-gray-200">↻</button>
      </div>
      <div className="relative" style={{minHeight}}>
        {showPlaceholder && placeholder && (
          <div className="absolute top-2 left-3 text-gray-400 pointer-events-none select-none text-sm">{placeholder}</div>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

const MANDATORY_PLATFORMS = ["Spotify","Apple Music","YouTube","Amazon Music"] as const;

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
  const [createdAt, setCreatedAt] = useState<string>(""); // YYYY-MM-DD
  const [concept, setConcept] = useState(""); // plain text for validation
  const [conceptRich, setConceptRich] = useState<any>(null); // JSON

  // Géneros
  const COMMON_GENRES = [
    'Pop','Rock','Hip Hop','Rap','R&B','Reggaeton','Electronic','Dance','Country','Jazz',
    'Blues','Classical','Metal','Punk','Indie','Latin','Folk','Soul','Trap','House'
  ];
  const [genreNames, setGenreNames] = useState<string[]>([]);
  const [genreSelect, setGenreSelect] = useState('');
  const [customGenre, setCustomGenre] = useState('');

  // Plataformas del álbum
  const [platformLinks, setPlatformLinks] = useState<PlatformLink[]>([]);
  // const [selectedPlatform, setSelectedPlatform] = useState(""); // (ya no se usa)
  const [newPlatformName, setNewPlatformName] = useState("");
  const [newPlatformUrl, setNewPlatformUrl] = useState("");
  const [showAddPlatformForm, setShowAddPlatformForm] = useState(false);

  // Tracklist state
  const [songs, setSongs] = useState<SongDraft[]>([]);
  const [songEditorOpen, setSongEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [songForm, setSongForm] = useState<SongDraft>({
    id: "",
    name: "",
    duration: "00:00",
    lyrics: "",
    lyricsRich: null,
    links: [],
  });
  const [newSongPlatformName, setNewSongPlatformName] = useState("");
  const [newSongPlatformUrl, setNewSongPlatformUrl] = useState("");
  const [showAddSongPlatformForm, setShowAddSongPlatformForm] = useState(false);

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

  // Helpers para géneros string[]
  const addGenre = (name: string) => {
    const g = name.trim();
    if (!g) return;
    const exists = genreNames.some((x) => x.toLowerCase() === g.toLowerCase());
    if (!exists) setGenreNames((prev) => [...prev, g]);
  };
  const removeGenre = (g: string) => setGenreNames((prev) => prev.filter((x) => x !== g));

  // Helpers Tracklist
  const openNewSong = () => {
    setEditingIndex(null);
    const mandatory = MANDATORY_PLATFORMS.map(n=>({ name:n, url:"" }));
    setSongForm({ id: "", name: "", duration: "00:00", lyrics: "", lyricsRich: null, links: mandatory });
    setSongEditorOpen(true);
  };
  const openEditSong = (idx: number) => {
    setEditingIndex(idx);
    const base = [...songs[idx].links];
    MANDATORY_PLATFORMS.forEach(m => { if (!base.find(l=>l.name.toLowerCase()===m.toLowerCase())) base.push({name:m, url:""}); });
    setSongForm({ ...songs[idx], links: base });
    setSongEditorOpen(true);
  };
  const saveSong = () => {
    // Validate mandatory platform URLs
    const missing = MANDATORY_PLATFORMS.filter(m => !songForm.links.find(l=> l.name.toLowerCase()===m.toLowerCase() && l.url.trim()));
    if (missing.length) { alert("Completa las URLs obligatorias de la canción: " + missing.join(", ")); return; }
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
  const handleRemoveSongLink = (name: string) => {
    if (MANDATORY_PLATFORMS.some(m => m.toLowerCase() === name.toLowerCase())) return; // no eliminar obligatorias
    setSongForm(s => ({ ...s, links: (s.links || []).filter(l => l.name !== name) }));
  };

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
    const createdAtDate = parseYYYYMMDD(createdAt);
    if (!name || !createdAtDate || !concept.trim() || genreNames.length === 0) {
      alert("Completa todos los campos obligatorios. El editor de descripción no puede estar vacío y al menos un género.");
      return;
    }
    const missingAlbumPlatforms = MANDATORY_PLATFORMS.filter(m => !platformLinks.find(p=> p.name.toLowerCase()===m.toLowerCase() && p.url.trim()));
    if (missingAlbumPlatforms.length) { alert("Completa las URLs obligatorias del álbum: " + missingAlbumPlatforms.join(", ")); return; }

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
        concept, // plain text fallback
        conceptRich, // JSON rich
        coverImage: coverImageUrl,
        createdAt: createdAtDate,
        genreNames, // array de strings
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
    const used = platformLinks.map((l) => l.name.toLowerCase());
    return MANDATORY_PLATFORMS.filter(p=>!used.includes(p.toLowerCase()));
  };

  // Platform helpers (previously referenced but not defined)
  const handleAddPlatform = () => {
    // replaced by custom add form
    return;
  };
  const handleRemoveLink = (idx: number) => {
    const pl = platformLinks[idx];
    if (MANDATORY_PLATFORMS.some(m=> m.toLowerCase()===pl.name.toLowerCase())) return; // cannot remove mandatory
    setPlatformLinks((prev) => prev.filter((_, i) => i !== idx));
  };

  // Asegurar que las plataformas obligatorias aparezcan siempre
  useEffect(() => {
    setPlatformLinks(prev => {
      let changed = false;
      const next = [...prev];
      MANDATORY_PLATFORMS.forEach(m => {
        if (!next.find(p => p.name.toLowerCase() === m.toLowerCase())) {
          next.push({ name: m, url: "" });
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, []);

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
                  type="date"
                  className="border rounded px-3 py-1 w-full text-sm !text-black placeholder:text-gray-500"
                  value={createdAt}
                  onChange={(e) => setCreatedAt(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Reseña + Géneros */}
            <div className="col-span-2 w-full">
              <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <label className="font-semibold text-sm text-black">Reseña/Descripción del álbum</label>
                  <RichTextEditor
                    value={conceptRich}
                    onChange={(json, html, text) => { setConceptRich(json); setConcept(text); }}
                    placeholder="Escribe la descripción..."
                  />
                </div>

                {/* Géneros múltiples */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-semibold text-sm text-black">Géneros musicales</label>

                  {/* Chips */}
                  <div className="flex flex-wrap gap-2">
                    {genreNames.map((g) => (
                      <span key={g} className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-3 py-1 text-xs">
                        {g}
                        <button type="button" className="text-purple-700" onClick={() => removeGenre(g)}>×</button>
                      </span>
                    ))}
                    {genreNames.length === 0 && (
                      <span className="text-xs text-gray-400">Selecciona o agrega géneros</span>
                    )}
                  </div>

                  {/* Select + custom */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <select
                        className="border rounded px-3 py-2 text-xs bg-white !text-black"
                        value={genreSelect}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '') { setGenreSelect(''); return; }
                          if (val === '__custom') {
                            setGenreSelect(val);
                            return;
                          }
                          addGenre(val);
                          setGenreSelect('');
                        }}
                      >
                        <option value="">Agregar género</option>
                        {COMMON_GENRES.filter((g) => !genreNames.some((x) => x.toLowerCase() === g.toLowerCase())).map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                        <option value="__custom">Agregar otro género...</option>
                      </select>
                    </div>

                    {genreSelect === '__custom' && (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          className="border rounded px-2 py-1 text-sm !text-black placeholder:text-gray-500"
                          placeholder="Nuevo género"
                          value={customGenre}
                          onChange={(e) => setCustomGenre(e.target.value)}
                        />
                        <button
                          type="button"
                          className="border border-purple-400 text-purple-500 rounded px-3 py-1 text-xs font-medium hover:bg-purple-50 disabled:opacity-50"
                          onClick={() => { addGenre(customGenre); setCustomGenre(''); setGenreSelect(''); }}
                          disabled={!customGenre.trim()}
                        >
                          Añadir
                        </button>
                        <button
                          type="button"
                          className="text-red-600 text-xs"
                          onClick={() => { setGenreSelect(''); setCustomGenre(''); }}
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Plataformas */}
            <div className="col-span-2 w-full">
              <div className="w-full max-w-2xl mx-auto">
                <div className="text-black font-semibold text-sm mb-2">Plataformas (obligatorias y adicionales)</div>
                {platformLinks.map((link, idx) => {
                  const mandatory = MANDATORY_PLATFORMS.some(m => m.toLowerCase()===link.name.toLowerCase());
                  return (
                    <div key={link.name + idx} className="mb-3">
                      <div className="text-black font-semibold text-sm mb-1">{`URL ${link.name}`}{mandatory && <span className="text-red-500 ml-1">*</span>}</div>
                      <div className="grid grid-cols-[44px_1fr_auto] gap-2 items-center">
                        <div className="flex justify-center items-center w-11 h-11 rounded-md border bg-white">
                          {PLATFORM_ICONS[link.name] || <span className="text-gray-400">+</span>}
                        </div>
                        <input
                          type="url"
                          placeholder="https://"
                          className="border rounded px-3 py-2 w-full text-sm !text-black placeholder:text-gray-400"
                          value={link.url}
                          onChange={(e) => {
                            setPlatformLinks(prev => prev.map((p,i)=> i===idx ? { ...p, url: e.target.value } : p));
                          }}
                          required={mandatory}
                        />
                        {mandatory ? (
                          <span className="w-5 h-5" />
                        ) : (
                          <button type="button" className="px-2 text-red-600" onClick={() => handleRemoveLink(idx)}>🗑️</button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Botón para mostrar formulario de plataforma adicional */}
                {!showAddPlatformForm && (
                  <button
                    type="button"
                    onClick={() => setShowAddPlatformForm(true)}
                    className="mt-2 border border-purple-400 text-purple-600 rounded px-4 py-2 text-xs font-medium hover:bg-purple-50"
                  >
                    Agregar plataforma
                  </button>
                )}

                {showAddPlatformForm && (
                  <div className="mt-4 space-y-2 border-t pt-4">
                    <div className="flex flex-col md:flex-row gap-2">
                      <input
                        type="text"
                        className="border rounded px-3 py-2 text-sm !text-black flex-1"
                        placeholder="Nombre plataforma"
                        value={newPlatformName}
                        onChange={(e)=> setNewPlatformName(e.target.value)}
                      />
                      <input
                        type="url"
                        className="border rounded px-3 py-2 text-sm !text-black flex-1"
                        placeholder="https://url"
                        value={newPlatformUrl}
                        onChange={(e)=> setNewPlatformUrl(e.target.value)}
                      />
                      <button
                        type="button"
                        className="border border-purple-400 text-purple-500 rounded px-4 py-2 text-xs font-medium hover:bg-purple-50 disabled:opacity-50"
                        disabled={!newPlatformName.trim() || !newPlatformUrl.trim() || platformLinks.some(p=> p.name.toLowerCase()===newPlatformName.trim().toLowerCase()) || MANDATORY_PLATFORMS.some(m=> m.toLowerCase()===newPlatformName.trim().toLowerCase())}
                        onClick={() => {
                          const name = newPlatformName.trim();
                          const url = newPlatformUrl.trim();
                          if (!name || !url) return;
                          setPlatformLinks(prev => [...prev, { name, url }]);
                          setNewPlatformName('');
                          setNewPlatformUrl('');
                          setShowAddPlatformForm(false);
                        }}
                      >
                        Guardar
                      </button>
                      <button
                        type="button"
                        className="text-xs text-red-600 px-3 py-2"
                        onClick={() => { setShowAddPlatformForm(false); setNewPlatformName(''); setNewPlatformUrl(''); }}
                      >
                        Cancelar
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-500">Las plataformas marcadas con * son obligatorias.</p>
                  </div>
                )}
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
                  <div className="text-sm text-black">{song.name || "Nombre de canción"}</div>
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
              className="self-start mt-2 border-2 border-dashed border-purple-400 text-purple-600 rounded-lg px-4 py-2 text-sm font-medium hover:bg-purple-50 transition"
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
          <div className="relative bg-white text-black rounded-2xl w-[min(900px,92vw)] max-h-[90vh] overflow-auto border-2 border-blue-400 p-4 pb-24">
            <div className="text-lg font-semibold mb-4 text-black">{editingIndex === null ? "Agregar Canción" : "Editar Canción"}</div>
            {/* Contenido scrollable */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-1 text-black">Nombre de Canción</label>
                <input
                  type="text"
                  className="border rounded px-3 py-2 w-full text-sm !text-black"
                  value={songForm.name}
                  onChange={(e) => setSongForm((s) => ({ ...s, name: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-black">Duración</label>
                <input
                  type="text"
                  placeholder="mm:ss"
                  className="border rounded px-3 py-2 w-full text-sm !text-black"
                  value={songForm.duration}
                  onChange={(e) => setSongForm((s) => ({ ...s, duration: formatDurationInput(e.target.value) }))}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-1 text-black">Letra de Canción</label>
                <RichTextEditor
                  value={songForm.lyricsRich}
                  onChange={(json, html, text) => setSongForm((s) => ({ ...s, lyricsRich: json, lyrics: html }))}
                  placeholder="Escribe la letra..."
                  minHeight="240px"
                />
              </div>

              {/* Sección de Plataformas de la canción (igual estilo álbum) */}
              <div className="col-span-2">
                <div className="text-black font-semibold text-sm mb-2">Plataformas (obligatorias y adicionales)</div>
                {(songForm.links || []).map((link) => {
                  const mandatory = MANDATORY_PLATFORMS.some(m => m.toLowerCase() === link.name.toLowerCase());
                  return (
                    <div key={link.name} className="mb-3">
                      <div className="text-black font-semibold text-sm mb-1">{`URL ${link.name}`}{mandatory && <span className="text-red-500 ml-1">*</span>}</div>
                      <div className="grid grid-cols-[44px_1fr_auto] gap-2 items-center">
                        <div className="flex justify-center items-center w-11 h-11 rounded-md border bg-white">
                          {PLATFORM_ICONS[link.name] || <span className="text-gray-400">+</span>}
                        </div>
                        <input
                          type="url"
                          placeholder="https://"
                          className="border rounded px-3 py-2 w-full text-sm !text-black placeholder:text-gray-400"
                          value={link.url}
                          onChange={(e) => {
                            const url = e.target.value;
                            setSongForm(s => ({
                              ...s,
                              links: (s.links || []).map(l => l.name === link.name ? { ...l, url } : l)
                            }));
                          }}
                          required={mandatory}
                        />
                        {mandatory ? (
                          <span className="w-5 h-5" />
                        ) : (
                          <button
                            type="button"
                            className="px-2 text-red-600"
                            onClick={() => handleRemoveSongLink(link.name)}
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {!showAddSongPlatformForm && (
                  <button
                    type="button"
                    onClick={() => setShowAddSongPlatformForm(true)}
                    className="mt-2 border border-purple-400 text-purple-600 rounded px-4 py-2 text-xs font-medium hover:bg-purple-50"
                  >
                    Agregar plataforma
                  </button>
                )}

                {showAddSongPlatformForm && (
                  <div className="mt-4 space-y-2 border-t pt-4">
                    <div className="flex flex-col md:flex-row gap-2">
                      <input
                        type="text"
                        className="border rounded px-3 py-2 text-sm !text-black flex-1"
                        placeholder="Nombre plataforma"
                        value={newSongPlatformName}
                        onChange={(e)=> setNewSongPlatformName(e.target.value)}
                      />
                      <input
                        type="url"
                        className="border rounded px-3 py-2 text-sm !text-black flex-1"
                        placeholder="https://url"
                        value={newSongPlatformUrl}
                        onChange={(e)=> setNewSongPlatformUrl(e.target.value)}
                      />
                      <button
                        type="button"
                        className="border border-purple-400 text-purple-500 rounded px-4 py-2 text-xs font-medium hover:bg-purple-50 disabled:opacity-50"
                        disabled={!newSongPlatformName.trim() || !newSongPlatformUrl.trim() || (songForm.links || []).some(l=> l.name.toLowerCase()===newSongPlatformName.trim().toLowerCase()) || MANDATORY_PLATFORMS.some(m=> m.toLowerCase()===newSongPlatformName.trim().toLowerCase())}
                        onClick={() => {
                          const name = newSongPlatformName.trim();
                          const url = newSongPlatformUrl.trim();
                          if (!name || !url) return;
                          setSongForm(s=> ({...s, links: [...(s.links || []), { name, url }]}));
                          setNewSongPlatformName('');
                          setNewSongPlatformUrl('');
                          setShowAddSongPlatformForm(false);
                        }}
                      >
                        Guardar
                      </button>
                      <button
                        type="button"
                        className="text-xs text-red-600 px-3 py-2"
                        onClick={() => { setShowAddSongPlatformForm(false); setNewSongPlatformName(''); setNewSongPlatformUrl(''); }}
                      >
                        Cancelar
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-500">Las plataformas marcadas con * son obligatorias.</p>
                  </div>
                )}

                {/* Botones acción canción debajo de plataformas */}
                <div className="mt-6 flex gap-3">
                  <button type="button" className="px-4 py-2 text-sm border rounded" onClick={() => setSongEditorOpen(false)}>Cancelar</button>
                  <button type="button" className="px-5 py-2 text-sm bg-black text-white rounded font-medium" onClick={saveSong}>Guardar canción</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}