import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(_req: Request, ctx: any) {
  const { params } = ctx as { params: { id: string } };
  try {
    const album = await db.album.findUnique({
      where: { id: params.id },
      include: { platforms: true },
    });
    if (!album) {
      return NextResponse.json({ message: "Álbum no encontrado" }, { status: 404 });
    }
    return NextResponse.json(album);
  } catch (error) {
    console.error("Error fetching album by id:", error);
    return NextResponse.json({ error: "Error al obtener el álbum" }, { status: 500 });
  }
}

export async function PATCH(req: Request, ctx: any) {
  const { params } = ctx as { params: { id: string } };
  try {
    const contentType = req.headers.get("content-type") || "";
    let body: any = {};

    if (contentType.includes("application/json")) {
      body = await req.json().catch(() => ({}));
    } else {
      const fd = await req.formData().catch(() => null);
      if (fd) body = Object.fromEntries(fd.entries());
    }

    let {
      name,
      concept,
      conceptRich,
      coverImage,
      createdAt,
      genreNames,
      status,
      platforms,
      project,
      publishedAt,
    } = body;

    const found = await db.album.findUnique({ where: { id: params.id } });
    if (!found) {
      return NextResponse.json({ message: "Álbum no encontrado" }, { status: 404 });
    }

    let createdAtValue: Date | undefined = undefined;
    if (createdAt !== undefined) {
      const d = new Date(createdAt);
      if (isNaN(d.getTime())) {
        return NextResponse.json({ message: "Fecha inválida" }, { status: 422 });
      }
      createdAtValue = d;
    }

    // genreNames
    if (genreNames !== undefined) {
      if (typeof genreNames === "string") {
        try {
          const parsed = JSON.parse(genreNames);
          genreNames = Array.isArray(parsed)
            ? parsed
            : String(genreNames)
                .split(",")
                .map((s: string) => s.trim())
                .filter((s: string) => s.length > 0);
        } catch {
          genreNames = String(genreNames)
            .split(",")
            .map((s: string) => s.trim())
            .filter((s: string) => s.length > 0);
        }
      }
      if (!Array.isArray(genreNames)) genreNames = [];
      genreNames = Array.from(new Set(genreNames.map((g: any) => (typeof g === "string" ? g.trim() : "")).filter((g: string) => g)));
    }

    // platforms
    let platformsOps:
      | {
          deleteMany: Record<string, never>;
          create: { name: string; url: string }[];
        }
      | undefined = undefined;
    if (platforms !== undefined) {
      let parsed: any[] = [];
      if (Array.isArray(platforms)) parsed = platforms;
      else if (typeof platforms === "string" && platforms.trim()) {
        try {
          const j = JSON.parse(platforms);
          if (Array.isArray(j)) parsed = j;
        } catch {
          parsed = [];
        }
      }
      const create = parsed
        .filter((p: any) => p?.name && p?.url)
        .map((p: any) => ({ name: String(p.name), url: String(p.url) }));
      platformsOps = { deleteMany: {}, create };
    }

    // conceptRich
    let conceptRichData: any = undefined;
    if (conceptRich !== undefined) {
      try {
        conceptRichData = typeof conceptRich === 'string' ? JSON.parse(conceptRich) : conceptRich;
      } catch {
        conceptRichData = undefined;
      }
    }

    // project
    let projectValue: "NOVA" | "NEXUS" | undefined = undefined;
    if (project !== undefined && typeof project === "string") {
      const p = project.trim().toUpperCase();
      if (p === 'NEXUS') projectValue = 'NEXUS';
      else if (p === 'NOVA') projectValue = 'NOVA';
    }

    const updated = await db.album.update({
      where: { id: params.id },
      data: {
        name: name !== undefined ? String(name) : undefined,
        concept: concept !== undefined ? String(concept) : undefined,
        conceptRich: conceptRich !== undefined ? conceptRichData : undefined,
        coverImage: coverImage !== undefined ? (coverImage ? String(coverImage) : null) : undefined,
        createdAt: createdAtValue,
        status: status !== undefined ? (status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT') : undefined,
        genreNames: genreNames !== undefined ? genreNames : undefined,
        platforms: platformsOps,
        project: projectValue,
        publishedAt: publishedAt !== undefined ? (publishedAt ? new Date(publishedAt) : null) : undefined,
      },
      include: { platforms: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating album:", error);
    return NextResponse.json({ error: "Error al actualizar el álbum" }, { status: 500 });
  }
}