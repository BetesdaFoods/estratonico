import { fetchOrganizedArticles, seedArticles } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function GET() {
	try {
		await seedArticles();
		const articles = await fetchOrganizedArticles();

		// Revalidate the article data in the cache after seeding

		// Main pages
		revalidatePath("/noticias");
		revalidatePath("/");

		// Same for each article individually
		revalidatePath(`/noticias/${articles.main.id}`);
		revalidatePath(`/noticias/${articles.secondary.id}`);
		for (const article of articles.latest) {
			revalidatePath(`/noticias/${article.id}`);
		}

		return new Response(
			JSON.stringify({
				message: "Articles seeded successfully",
				articles,
			}),
			{
				headers: { "content-type": "application/json" },
			}
		);
	} catch (error) {
		console.error("Database Error:", error);
		return new Response(
			JSON.stringify({ error: "Failed to seed articles" }),
			{
				status: 500,
				headers: { "content-type": "application/json" },
			}
		);
	}
}
