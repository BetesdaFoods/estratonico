import { NextResponse } from "next/server";
import { createGenre, fetchGenres } from "@/lib/data";

export async function GET() {
  try {
    const genres = await fetchGenres();
    return NextResponse.json(genres);
  } catch (e: any) {
    return NextResponse.json({ message: e.message ?? "Error interno" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = typeof body?.name === "string" ? body.name : "";
    if (!name?.trim()) {
      return NextResponse.json({ message: "Nombre inválido" }, { status: 400 });
    }

    const genre = await createGenre(name);
    return NextResponse.json(genre, { status: 201 });
  } catch (e: any) {
    const message = e?.message || "Error interno";
    const status =
      /existe/i.test(message) ? 409 :
      /2 y 100/.test(message) ? 422 : 500;
    return NextResponse.json({ message }, { status });
  }
}