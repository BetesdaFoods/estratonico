import { fetchArticles, deleteArticle } from "@/lib/data";
import Button from "@/Components/ui/Button";
import Dashboard from "@/Components/AdminArticles/Dashboard";

async function page() {
	const articles = await fetchArticles();

	async function deleteArticleHandler(id: string) {
		"use server";

		try {
			await deleteArticle(id);
			return { success: true };
		} catch (error) {
			console.error("Error deleting article:", error);
			return { 
				success: false, 
				message: error instanceof Error ? error.message : "An unknown error occurred" 
			};
		}
	}

	return (
		<section className="min-h-[1300px] h-screen flex flex-col pt-36 pb-6 px-16 bg-grayBackground">
			<div className="flex-1 flex flex-col min-h-0">
				<div className="bg-white text-black px-12 rounded-[2rem] flex flex-col h-full">
					{/* Button - fixed height */}
					<Button
						variant="black"
						sm
						className="uppercase text-xl my-8 py-4 px-12 w-fit"
						href="/admin/noticias/crear"
					>
						Crear
					</Button>

					<Dashboard
						initialArticles={articles}
						deleteArticleHandler={deleteArticleHandler}
					/>
				</div>
			</div>
		</section>
	);
}

export default page;
