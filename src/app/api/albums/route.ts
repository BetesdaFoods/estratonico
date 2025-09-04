import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const albums = await db.album.findMany({
      include: { genres: true, platforms: true },
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

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let body: any = {};

    if (contentType.includes("application/json")) {
      body = await req.json().catch(() => ({}));
    } else {
      const fd = await req.formData().catch(() => null);
      if (fd) body = Object.fromEntries(fd.entries());
    }

    let { name, concept, coverImage, createdAt, genreIds, status, platforms, project, publishedAt } = body;

    // Normalizar project (Universe)
    let projectValue: "NOVA" | "NEXUS" | undefined;
    if (typeof project === "string") {
      const p = project.trim().toUpperCase();
      if (p === "NEXUS") projectValue = "NEXUS";
      else if (p === "NOVA") projectValue = "NOVA";
    }

    if (!name || !concept) {
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

    // Normalizar genreIds
    if (typeof genreIds === "string") {
      try {
        const parsed = JSON.parse(genreIds);
        genreIds = Array.isArray(parsed) ? parsed : String(genreIds).split(",").map((s) => s.trim());
      } catch {
        genreIds = String(genreIds).split(",").map((s) => s.trim());
      }
    }

    if (!Array.isArray(genreIds) || genreIds.length === 0) {
      return NextResponse.json({ message: "Selecciona al menos un género" }, { status: 400 });
    }

    const album = await db.album.create({
      data: {
        name,
        concept,
        coverImage: coverImage ?? null,
        createdAt,
        status: status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
        genres: { connect: genreIds.map((id: string) => ({ id })) },
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
      include: { genres: true, platforms: true },
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