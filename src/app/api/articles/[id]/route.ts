import { NextResponse } from "next/server";
import { fetchArticleById, updateArticle, deleteArticle } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const article = await fetchArticleById(id);

		if (!article) {
			return NextResponse.json(
				{ error: "Article not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(article, { status: 200 });
	} catch (error) {
		console.error("Error fetching article:", error);
		return NextResponse.json(
			{ error: "An error occurred while fetching article" },
			{ status: 500 }
		);
	}
}

export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const articleData = await request.json();

		// Ensure the ID in the URL is used
		articleData.id = id;

		const updatedArticle = await updateArticle(articleData);

		if (!updatedArticle) {
			return NextResponse.json(
				{ error: "Article not found" },
				{ status: 404 }
			);
		}

		// Revalidate the article data in the cache after updating
		const paths = ["/noticias", `/noticias/${id}`, "/"];
		for (const path of paths) {
			revalidatePath(path);
		}

		return NextResponse.json(updatedArticle, { status: 200 });
	} catch (error) {
		console.error("Error updating article:", error);
		return NextResponse.json(
			{ error: "An error occurred while updating article" },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const deletedArticle = await deleteArticle(id);

		if (!deletedArticle) {
			return NextResponse.json(
				{ error: "Article not found" },
				{ status: 404 }
			);
		}

		// Revalidate the article data in the cache after deleting
		const paths = ["/noticias", `/noticias/${id}`, "/"];
		for (const path of paths) {
			revalidatePath(path);
		}

		return NextResponse.json(deletedArticle, { status: 200 });
	} catch (error) {
		console.error("Error deleting article:", error);
		return NextResponse.json(
			{ error: "An error occurred while deleting article" },
			{ status: 500 }
		);
	}
}
