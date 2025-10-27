"use server";

import { _ArticleBluePrint, ArticleType, Article } from "./definitions";
import articles from "./placeholder-articles";
import db from "./db";
import { Genre, Prisma } from "@prisma/client";

/* ----------------------------- Helpers comunes ---------------------------- */
function sanitizeName(name: string) {
  return name.trim().replace(/\s+/g, " ");
}

/* -------------------------------- Articles -------------------------------- */

export async function seedArticles() {
  await db.articles.deleteMany();
  const insertedArticles = await db.articles.createMany({ data: articles });
  if (insertedArticles.count === 0) {
    throw new Error("No articles were inserted");
  }
}

export async function fetchArticles() {
  try {
    const list = await db.articles.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return list as Article[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("An error occurred while fetching articles");
  }
}

export async function fetchPaginatedArticles(page: number, limit: number) {
  try {
    const list = await db.articles.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { updatedAt: "desc" },
    });
    return list as Article[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("An error occurred while fetching articles");
  }
}

export async function fetchArticleById(id: string) {
  try {
    const article = await db.articles.findUnique({ where: { id } });
    if (!article) {
      throw new Error("Article not found");
    }
    return article as Article;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("An error occurred while fetching article");
  }
}

export async function fetchNormalArticles() {
  try {
    const list = await db.articles.findMany({
      where: { type: ArticleType.Normal },
      orderBy: { updatedAt: "desc" },
    });
    return list as Article[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("An error occurred while fetching articles");
  }
}

export async function fetchOrganizedArticles() {
  const latest = (await db.articles.findMany({
    orderBy: { updatedAt: "desc" },
  })) as Article[];

  const mainIdx = latest.findIndex((a) => a.type === ArticleType.Main);
  if (mainIdx === -1) throw new Error("Main article not found");
  const main = latest.splice(mainIdx, 1)[0];

  const secondaryIdx = latest.findIndex((a) => a.type === ArticleType.Secondary);
  if (secondaryIdx === -1) throw new Error("Secondary article not found");
  const secondary = latest.splice(secondaryIdx, 1)[0];

  if (latest.length === 0) throw new Error("No normal articles found");

  return { main, secondary, latest };
}

export async function createArticle(article: Article) {
  const data: _ArticleBluePrint = { ...article };
  delete data.id;

  try {
    const created = await db.articles.create({ data });
    return created as Article;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("An error occurred while creating article");
  }
}

export async function updateArticle(article: Article) {
  try {
    const updated = await db.articles.update({
      where: { id: article.id },
      data: article,
    });
    if (!updated) throw new Error("Article not found");
    return updated as Article;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("An error occurred while updating article");
  }
}

export async function deleteArticle(id: string) {
  return db.$transaction(async (tx) => {
    const deleted = await tx.articles.delete({ where: { id } });
    if (!deleted) throw new Error("Article not found");

    if (deleted.type === ArticleType.Main) {
      const exists = await tx.articles.findFirst({ where: { type: ArticleType.Main } });
      if (!exists) throw new Error("Cannot delete last Main article");
    } else if (deleted.type === ArticleType.Secondary) {
      const exists = await tx.articles.findFirst({ where: { type: ArticleType.Secondary } });
      if (!exists) throw new Error("Cannot delete last Secondary article");
    }

    return deleted as Article;
  });
}

export async function addSubscriberToNewsletter(email: string) {
  try {
    const subscriber = await db.newsletterSubscribers.findUnique({ where: { email } });
    if (subscriber) return subscriber;
    return await db.newsletterSubscribers.create({ data: { email } });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("An error occurred while adding email to newsletter");
  }
}

/* --------------------------------- Genres --------------------------------- */

export async function fetchGenres(): Promise<Genre[]> {
  try {
    return await db.genre.findMany({ orderBy: { name: "asc" } });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("An error occurred while fetching genres");
  }
}

export async function fetchGenreById(id: string): Promise<Genre> {
  try {
    const genre = await db.genre.findUnique({ where: { id } });
    if (!genre) throw new Error("Genre not found");
    return genre;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("An error occurred while fetching genre");
  }
}

export async function createGenre(name: string): Promise<Genre> {
  const clean = sanitizeName(name);
  if (clean.length < 2 || clean.length > 100) {
    throw new Error("El nombre debe tener entre 2 y 100 caracteres");
  }

  try {
    return await db.genre.create({ data: { name: clean } });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new Error("El género ya existe");
    }
    console.error("Database Error:", error);
    throw new Error("An error occurred while creating genre");
  }
}

export async function updateGenre(id: string, name: string): Promise<Genre> {
  const clean = sanitizeName(name);
  if (clean.length < 2 || clean.length > 100) {
    throw new Error("El nombre debe tener entre 2 y 100 caracteres");
  }

  try {
    return await db.genre.update({ where: { id }, data: { name: clean } });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") throw new Error("El género ya existe");
      if (error.code === "P2025") throw new Error("Genre not found");
    }
    console.error("Database Error:", error);
    throw new Error("An error occurred while updating genre");
  }
}

export async function deleteGenre(id: string): Promise<{ ok: true }> {
  try {
    const albumsUsing = await db.album.count({
      where: ({ genres: { some: { id } } } as unknown) as Prisma.AlbumWhereInput,
    });
    if (albumsUsing > 0) {
      throw new Error("No se puede borrar: género asociado a uno o más álbumes");
    }
    await db.genre.delete({ where: { id } });
    return { ok: true };
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      throw new Error("Genre not found");
    }
    console.error("Database Error:", error);
    throw new Error("An error occurred while deleting genre");
  }
}

export async function fetchGenresByIds(ids: string[]): Promise<Genre[]> {
  if (!Array.isArray(ids) || ids.length === 0) return [];
  try {
    return await db.genre.findMany({
      where: { id: { in: ids } },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("An error occurred while fetching genres by ids");
  }
}