"use client";

import { useEffect, useMemo, useState, JSX } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect as useEffectSync } from 'react';

type PlatformLink = { name: string; url: string }
type Universe = "NOVA" | "NEXUS";

const PLATFORM_ICONS: Record<string, JSX.Element> = {
  Spotify: <Image src="/assets/blacks/spotify-footer.svg" alt="Spotify" width={20} height={20} />,
  "Apple Music": <Image src="/assets/blacks/apple-footer.svg" alt="Apple Music" width={20} height={20} />,
  YouTube: <Image src="/assets/blacks/youtube-music.svg" alt="YouTube" width={20} height={20} />,
  "Amazon Music": <Image src="/assets/blacks/amazon-footer.svg" alt="Amazon Music" width={20} height={20} />,
};
const SONG_PLATFORMS = Object.keys(PLATFORM_ICONS);
const MANDATORY_PLATFORMS = ["Spotify","Apple Music","YouTube","Amazon Music"] as const;

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
  const digits = raw.replace(/\D/g, "").slice(0, 4); // mmss
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

// Rich Text Editor reutilizable (igual que en crear)
function RichTextEditor({ value, onChange, placeholder, minHeight = '180px' }: { value: any; onChange: (json: any, html: string, text: string) => void; placeholder?: string; minHeight?: string; }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || null,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON(), editor.getHTML(), editor.getText());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none px-3 py-2 text-black',
      },
    },
  });

  useEffectSync(() => {
    if (!editor) return;
    if (value) {
      try { editor.commands.setContent(value); } catch { /* ignore */ }
    } else if (value === null) {
      editor.commands.clearContent();
    }
  }, [value, editor]);

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
  const [conceptRich, setConceptRich] = useState<any>(null);

  // Plataformas (álbum)
  const [platformLinks, setPlatformLinks] = useState<PlatformLink[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState(""); // legacy (no se usa ahora)
  const [newPlatformName, setNewPlatformName] = useState("");
  const [newPlatformUrl, setNewPlatformUrl] = useState("");

  // Tracklist
  const [songs, setSongs] = useState<SongDraft[]>([]);
  const [existingSongIds, setExistingSongIds] = useState<string[]>([]);
  const [songEditorOpen, setSongEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [songForm, setSongForm] = useState<SongDraft>({ id: "", name: "", duration: "00:00", lyrics: "", links: [] });
  const [newSongPlatformName, setNewSongPlatformName] = useState("");
  const [newSongPlatformUrl, setNewSongPlatformUrl] = useState("");

  // Replace old genre relation state with new string[] approach
  const COMMON_GENRES = [
    'Pop','Rock','Hip Hop','Rap','R&B','Reggaeton','Electronic','Dance','Country','Jazz',
    'Blues','Classical','Metal','Punk','Indie','Latin','Folk','Soul','Trap','House'
  ];
  const [genreNames, setGenreNames] = useState<string[]>([]);
  const [genreSelect, setGenreSelect] = useState('');
  const [customGenre, setCustomGenre] = useState('');

  // Cargar datos iniciales (eliminar fetch /api/genres)
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
        if (a.publishedAt) {
          const { dateStr, timeStr } = fromUTCToUTCMinus4(a.publishedAt);
            setScheduleOn(true);
            setScheduleDate(dateStr);
            setScheduleTime(timeStr);
        }
        // Géneros: usar a.genreNames si existe; fallback a nombres de a.genres
        if (Array.isArray(a.genreNames) && a.genreNames.length > 0) {
          setGenreNames(a.genreNames.filter((g: any) => typeof g === 'string' && g.trim()).map((g: string) => g.trim()));
        } else if (Array.isArray(a.genres)) {
          setGenreNames(a.genres.map((g: any) => g.name).filter((g: any) => typeof g === 'string' && g.trim()));
        }
        if (a.conceptRich) {
          try { setConceptRich(typeof a.conceptRich === 'string' ? JSON.parse(a.conceptRich) : a.conceptRich); } catch { setConceptRich(null); }
        } else if (a.concept) {
          setConceptRich({ type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: a.concept }] }] });
        }
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
            links: Array.isArray(s.platforms) ? s.platforms.map((p: any) => ({ name: p.name, url: p.url })) : [],
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

  // Helpers para géneros string[]
  const addGenre = (name: string) => {
    const g = name.trim();
    if (!g) return;
    const exists = genreNames.some((x) => x.toLowerCase() === g.toLowerCase());
    if (!exists) setGenreNames((prev) => [...prev, g]);
  };
  const removeGenre = (g: string) => setGenreNames((prev) => prev.filter((x) => x !== g));
  const availableCommonGenres = COMMON_GENRES.filter((g) => !genreNames.some((x) => x.toLowerCase() === g.toLowerCase()));

  // Tracklist helpers (restored)
  const openNewSong = () => {
    setEditingIndex(null);
    const mandatory = MANDATORY_PLATFORMS.map(n=>({ name:n, url:"" }));
    setSongForm({ id: "", name: "", duration: "00:00", lyrics: "", links: mandatory });
    setSongEditorOpen(true);
  };
  const openEditSong = (idx: number) => {
    setEditingIndex(idx);
    const base = [...songs[idx].links];
    MANDATORY_PLATFORMS.forEach(m => { if (!base.find(l=> l.name.toLowerCase()===m.toLowerCase())) base.push({ name:m, url:"" }); });
    setSongForm({ ...songs[idx], links: base });
    setSongEditorOpen(true);
  };
  const saveSong = () => {
    const missing = MANDATORY_PLATFORMS.filter(m => !songForm.links.find(l=> l.name.toLowerCase()===m.toLowerCase() && l.url.trim()));
    if (missing.length) { alert("Completa las URLs obligatorias de la canción: " + missing.join(", ")); return; }
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

  // Plataformas disponibles helper
  const getAvailablePlatforms = () => {
    const used = platformLinks.map((l) => l.name);
    return Object.keys(PLATFORM_ICONS).filter((p) => !used.includes(p));
  };

  // Construye publishedAt (restored)
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
    if (!name || !createdAtDate || !concept || genreNames.length === 0) {
      alert("Completa todos los campos obligatorios. La fecha debe ser dd/mm/yyyy y al menos un género.");
      return;
    }
    const missingAlbumPlatforms = MANDATORY_PLATFORMS.filter(m => !platformLinks.find(p=> p.name.toLowerCase()===m.toLowerCase() && p.url.trim()));
    if (missingAlbumPlatforms.length) { alert("Completa las URLs obligatorias del álbum: " + missingAlbumPlatforms.join(", ")); return; }

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
      conceptRich,
      coverImage: coverImageUrl,
      createdAt: createdAtDate,
      genreNames, // updated
      platforms: platformLinks.filter((l) => l.name && l.url),
      project: universe,
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
                  <RichTextEditor
                    value={conceptRich}
                    onChange={(json, html, text) => { setConceptRich(json); setConcept(text); }}
                    placeholder="Escribe la descripción..."
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-semibold text-sm text-black">Géneros musicales</label>
                  <div className="flex flex-wrap gap-2">
                    {genreNames.map((g) => (
                      <span key={g} className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-3 py-1 text-xs">
                        {g}
                        <button type="button" className="text-purple-700" onClick={() => removeGenre(g)}>×</button>
                      </span>
                    ))}
                    {genreNames.length === 0 && <span className="text-xs text-gray-400">Selecciona o agrega géneros</span>}
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <select
                        className="border rounded px-3 py-2 text-xs bg-white !text-black"
                        value={genreSelect}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '') { setGenreSelect(''); return; }
                          if (val === '__custom') { setGenreSelect(val); return; }
                          addGenre(val);
                          setGenreSelect('');
                        }}
                      >
                        <option value="">Agregar género</option>
                        {availableCommonGenres.map((g) => (
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
                        <button type="button" className="text-red-600 text-xs" onClick={() => { setGenreSelect(''); setCustomGenre(''); }}>
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Plataformas álbum */}
            <div className="col-span-2 w-full">
              <div className="w-full max-w-2xl mx-auto">
                <div className="text-black font-semibold text-sm mb-2">Plataformas (obligatorias y adicionales)</div>
                {platformLinks.map((link, idx) => {
                  const mandatory = MANDATORY_PLATFORMS.some(m => m.toLowerCase()===link.name.toLowerCase());
                  return (
                    <div key={idx} className="mb-3">
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
                        <button type="button" className={`px-2 ${mandatory? 'opacity-30 cursor-not-allowed':'text-red-600'}`} onClick={() => {
                          if (mandatory) return; 
                          setPlatformLinks(prev => prev.filter((_,i)=> i!==idx));
                        }} disabled={mandatory}>🗑️</button>
                      </div>
                    </div>
                  );
                })}
                <div className="mt-6 space-y-2">
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
                      }}
                    >
                      Añadir plataforma
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500">Las plataformas marcadas con * son obligatorias.</p>
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
                {MANDATORY_PLATFORMS.map((p) => {
                  const idx = (songForm.links || []).findIndex((l) => l.name === p);
                  const value = idx >= 0 ? songForm.links[idx].url : "";
                  return (
                    <div key={p}>
                      <div className="text-black font-semibold text-sm mb-1">{`URL ${p}`}<span className="text-red-500 ml-1">*</span></div>
                      <div className="grid grid-cols-[44px_1fr] gap-2 items-center">
                        <div className="flex justify-center items-center w-11 h-11 rounded-md border bg-white">
                          {PLATFORM_ICONS[p]}
                        </div>
                        <input
                          type="url"
                          placeholder="https://"
                          className="border rounded px-3 py-2 w-full text-sm !text-black placeholder:text-gray-400"
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
                          required
                        />
                      </div>
                    </div>
                  );
                })}
                {(songForm.links || []).filter(l=> !MANDATORY_PLATFORMS.some(m=> m.toLowerCase()===l.name.toLowerCase())).map((l) => {
                  const idx = songForm.links.findIndex(x=> x.name === l.name);
                  return (
                    <div key={l.name} className="col-span-2 flex items-center gap-2">
                      <span className="text-xs font-semibold text-black min-w-[90px] truncate">{l.name}</span>
                      <input
                        type="url"
                        className="border rounded px-3 py-2 text-sm !text-black flex-1"
                        placeholder="https://"
                        value={l.url}
                        onChange={(e)=> setSongForm(s=> ({...s, links: s.links.map((ln,i)=> i===idx ? { ...ln, url: e.target.value } : ln)}))}
                      />
                      <button type="button" className="text-red-600 text-xs" onClick={()=> setSongForm(s=> ({...s, links: s.links.filter((_,i)=> i!==idx)}))}>🗑️</button>
                    </div>
                  );
                })}
                <div className="col-span-2 flex flex-col gap-2 mt-2">
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
                      disabled={!newSongPlatformName.trim() || !newSongPlatformUrl.trim() || songForm.links.some(l=> l.name.toLowerCase()===newSongPlatformName.trim().toLowerCase()) || MANDATORY_PLATFORMS.some(m=> m.toLowerCase()===newSongPlatformName.trim().toLowerCase())}
                      onClick={() => {
                        const name = newSongPlatformName.trim();
                        const url = newSongPlatformUrl.trim();
                        if (!name || !url) return;
                        setSongForm(s=> ({...s, links: [...s.links, { name, url }]}));
                        setNewSongPlatformName('');
                        setNewSongPlatformUrl('');
                      }}
                    >
                      Añadir plataforma
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500">Las cuatro primeras plataformas son obligatorias.</p>
                </div>
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