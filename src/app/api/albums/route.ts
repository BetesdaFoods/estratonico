import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const albums = await db.album.findMany({
      // Ya no incluimos genres (relación eliminada). Solo plataformas.
      include: { platforms: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(albums);
  } catch (error) {
    console.error("Error fetching albums:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching albums" },
      { status: 500 }
    );
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

    let { name, concept, conceptRich, coverImage, createdAt, genreNames, status, platforms, project, publishedAt } = body;

    // Normalizar project (Universe)
    let projectValue: "NOVA" | "NEXUS" | undefined;
    if (typeof project === "string") {
      const p = project.trim().toUpperCase();
      if (p === "NEXUS") projectValue = "NEXUS";
      else if (p === "NOVA") projectValue = "NOVA";
    }

    if (!name || (!concept && !conceptRich)) {
      return NextResponse.json({ message: "Faltan campos obligatorios" }, { status: 400 });
    }

    // Fecha
    if (createdAt) {
      createdAt = new Date(createdAt);
      if (isNaN(createdAt.getTime())) {
        return NextResponse.json({ message: "Fecha inválida" }, { status: 422 });
      }
    } else {
      createdAt = new Date();
    }

    // Normalizar genreNames (array de strings)
    if (genreNames !== undefined) {
      if (typeof genreNames === "string") {
        try {
          const parsed = JSON.parse(genreNames);
          genreNames = Array.isArray(parsed)
            ? parsed
            : String(genreNames).split(",").map((s) => s.trim());
        } catch {
          genreNames = String(genreNames).split(",").map((s) => s.trim());
        }
      }
    }
    if (!Array.isArray(genreNames)) genreNames = [];
    genreNames = Array.from(
      new Set(
        genreNames
          .map((g: any) => (typeof g === "string" ? g.trim() : ""))
          .filter((g: string) => g.length > 0)
      )
    );

    if (genreNames.length === 0) {
      return NextResponse.json({ message: "Debes indicar al menos un género" }, { status: 400 });
    }

    let conceptRichData: any = undefined;
    if (conceptRich) {
      try {
        conceptRichData = typeof conceptRich === "string" ? JSON.parse(conceptRich) : conceptRich;
      } catch {
        conceptRichData = undefined;
      }
    }

    const album = await db.album.create({
      data: {
        name,
        concept: concept || "",
        conceptRich: conceptRichData,
        coverImage: coverImage ?? null,
        createdAt,
        status: status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
        genreNames, // nuevo campo
        platforms: {
          create: Array.isArray(platforms)
            ? platforms
                .filter((p: any) => p?.name && p?.url)
                .map((p: any) => ({ name: p.name, url: p.url }))
            : [],
        },
        project: projectValue,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      },
      include: { platforms: true },
    });

    return NextResponse.json(album, { status: 201 });
  } catch (error) {
    console.error("Error creating album:", error);
    return NextResponse.json(
      { error: "An error occurred while creating album" },
      { status: 500 }
    );
  }
}