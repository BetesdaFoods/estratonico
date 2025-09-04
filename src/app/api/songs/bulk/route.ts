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

export async function POST(req: Request) {
  try {
    const { albumId, songs } = await req.json();

    if (!albumId || !Array.isArray(songs) || songs.length === 0) {
      return NextResponse.json({ message: "albumId y songs[] requeridos" }, { status: 400 });
    }

    const created = await db.$transaction(
      songs.map((s: any) =>
        db.song.create({
          data: {
            albumId: String(albumId),
            name: String(s.name),
            duration: toSeconds(s.duration),
            lyrics: s.lyrics ? String(s.lyrics) : null,
            platforms: {
              create: Array.isArray(s.links ?? s.platforms)
                ? (s.links ?? s.platforms)
                    .filter((l: any) => l?.name && l?.url)
                    .map((l: any) => ({ name: String(l.name), url: String(l.url) }))
                : [],
            },
          },
          include: { platforms: true },
        })
      )
    );

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error bulk-creating songs:", error);
    return NextResponse.json({ error: "Error bulk-creating songs" }, { status: 500 });
  }
}