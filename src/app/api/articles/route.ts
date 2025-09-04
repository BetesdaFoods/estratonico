import { NextResponse } from "next/server";
import { createArticle, fetchArticles, fetchPaginatedArticles } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const page = searchParams.get("page");
		const limit = searchParams.get("limit");

		if (!page || !limit) {
			const articles = await fetchArticles();
			return NextResponse.json(articles, { status: 200 });
		} else {
			const pageNumber = parseInt(page as string, 10);
			const limitNumber = parseInt(limit as string, 10);

			if (isNaN(pageNumber) || isNaN(limitNumber)) {
				return NextResponse.json(
					{ error: "Invalid page or limit" },
					{ status: 400 }
				);
			}

			const articles = await fetchPaginatedArticles(pageNumber, limitNumber);
			return NextResponse.json(articles, { status: 200 });
		}
	} catch (error) {
		console.error("Error fetching articles:", error);
		return NextResponse.json(
			{ error: "An error occurred while fetching articles" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const article = await request.json();
		const newArticle = await createArticle(article);

		// Revalidate the article data in the cache after creating
		const paths = ["/noticias", `/noticias/${newArticle.id}`, "/"];
		for (const path of paths) {
			revalidatePath(path);
		}

		return NextResponse.json(newArticle, { status: 201 });
	} catch (error) {
		console.error("Error creating article:", error);
		return NextResponse.json(
			{ error: "An error occurred while creating article" },
			{ status: 500 }
		);
	}
}
