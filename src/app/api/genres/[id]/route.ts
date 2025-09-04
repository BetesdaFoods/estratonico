import { NextRequest, NextResponse } from "next/server";
import { deleteGenre, fetchGenreById, updateGenre } from "@/lib/data";

type Params = { params: { id: string } };

export async function GET(_: NextRequest, { params }: Params) {
  try {
    const genre = await fetchGenreById(params.id);
    return NextResponse.json(genre);
  } catch (e: any) {
    const message = e?.message || "No encontrado";
    const status = /not found/i.test(message) ? 404 : 500;
    return NextResponse.json({ message }, { status });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = typeof body?.name === "string" ? body.name : "";
    if (!name?.trim()) {
      return NextResponse.json({ message: "Nombre inválido" }, { status: 400 });
    }

    const updated = await updateGenre(params.id, name);
    return NextResponse.json(updated);
  } catch (e: any) {
    const message = e?.message || "Error interno";
    const status =
      /existe/i.test(message) ? 409 :
      /not found/i.test(message) ? 404 :
      /2 y 100/.test(message) ? 422 : 500;
    return NextResponse.json({ message }, { status });
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const result = await deleteGenre(params.id);
    return NextResponse.json(result);
  } catch (e: any) {
    const message = e?.message || "Error interno";
    const status =
      /asociado/.test(message) ? 409 :
      /not found/i.test(message) ? 404 : 500;
    return NextResponse.json({ message }, { status });
  }
}