import { NextResponse } from "next/server";
import db from "@/lib/db";

const toSeconds = (v: unknown): number => {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const mmss = v.match(/^(\d{1,2}):(\d{2})$/);
    if (mmss) return Number(mmss[1]) * 60 + Number(mmss[2]);
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return 0;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const albumId = searchParams.get("albumId") || undefined;

    const songs = await db.song.findMany({
      where: albumId ? { albumId } : undefined,
      include: { platforms: true },
    });

    return NextResponse.json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    return NextResponse.json({ error: "Error fetching songs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let body: any = {};
    if (contentType.includes("application/json")) {
      body = await req.json().catch(() => ({}));
    } else {
      const fd = await req.formData().catch(() => null);
      if (fd) body = Object.fromEntries(fd.entries());
    }

    const { albumId, name, duration, lyrics } = body;
    // Del front puede venir como "links" o "platforms"
    let platforms = body.platforms ?? body.links;

    if (!albumId || !name) {
      return NextResponse.json({ message: "albumId y name son requeridos" }, { status: 400 });
    }

    // Normalizar plataformas
    let parsedPlatforms: any[] = [];
    if (Array.isArray(platforms)) {
      parsedPlatforms = platforms;
    } else if (typeof platforms === "string" && platforms.trim()) {
      try {
        const j = JSON.parse(platforms);
        if (Array.isArray(j)) parsedPlatforms = j;
      } catch {
        parsedPlatforms = [];
      }
    }

    const song = await db.song.create({
      data: {
        albumId: String(albumId),
        name: String(name),
        duration: toSeconds(duration),
        lyrics: lyrics ? String(lyrics) : null,
        platforms: {
          create: parsedPlatforms
            .filter((p: any) => p?.name && p?.url)
            .map((p: any) => ({ name: String(p.name), url: String(p.url) })),
        },
      },
      include: { platforms: true },
    });

    return NextResponse.json(song, { status: 201 });
  } catch (error) {
    console.error("Error creating song:", error);
    return NextResponse.json({ error: "Error creating song" }, { status: 500 });
  }
}