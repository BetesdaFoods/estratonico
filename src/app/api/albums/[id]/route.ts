import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const album = await db.album.findUnique({
      where: { id: params.id },
      include: { genres: true, platforms: true },
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

export async function PATCH(req: NextRequest, { params }: Params) {
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
      coverImage,
      createdAt,
      genreIds, // puede venir string JSON o "id1,id2"
      status,
      platforms, // array o string JSON
    } = body;

    // Validar existencia
    const found = await db.album.findUnique({ where: { id: params.id } });
    if (!found) {
      return NextResponse.json({ message: "Álbum no encontrado" }, { status: 404 });
    }

    // Normalizar createdAt
    let createdAtValue: Date | undefined = undefined;
    if (createdAt !== undefined) {
      const d = new Date(createdAt);
      if (isNaN(d.getTime())) {
        return NextResponse.json({ message: "Fecha inválida" }, { status: 422 });
      }
      createdAtValue = d;
    }

    // Normalizar genreIds (si viene, reemplaza)
    let genresSet:
      | { set: { id: string }[] }
      | undefined = undefined;
    if (genreIds !== undefined) {
      if (typeof genreIds === "string") {
        try {
          const parsed = JSON.parse(genreIds);
          genreIds = Array.isArray(parsed)
            ? parsed
            : String(genreIds)
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
        } catch {
          genreIds = String(genreIds)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }
      if (Array.isArray(genreIds)) {
        genresSet = { set: genreIds.map((id: string) => ({ id })) };
      }
    }

    // Normalizar platforms (si viene, reemplaza todas)
    let platformsOps:
      | {
          deleteMany: {};
          create: { name: string; url: string }[];
        }
      | undefined = undefined;

    if (platforms !== undefined) {
      let parsed: any[] = [];
      if (Array.isArray(platforms)) {
        parsed = platforms;
      } else if (typeof platforms === "string" && platforms.trim()) {
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

    const updated = await db.album.update({
      where: { id: params.id },
      data: {
        name: name !== undefined ? String(name) : undefined,
        concept: concept !== undefined ? String(concept) : undefined,
        coverImage: coverImage !== undefined ? (coverImage ? String(coverImage) : null) : undefined,
        createdAt: createdAtValue,
        status:
          status !== undefined
            ? status === "PUBLISHED"
              ? "PUBLISHED"
              : "DRAFT"
            : undefined,
        genres: genresSet,
        platforms: platformsOps,
      },
      include: { genres: true, platforms: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating album:", error);
    return NextResponse.json({ error: "Error al actualizar el álbum" }, { status: 500 });
  }
}