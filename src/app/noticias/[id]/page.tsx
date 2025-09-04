import { fetchArticles, fetchArticleById } from "@/lib/data";
import { Article } from "@/lib/definitions";
import ArticleDetail from "@/Components/ArticlePage/ArticleDetail";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const article: Article = await fetchArticleById(id);

	return {
		title: article.title,
		description: article.summary,
		openGraph: {
			title: article.title,
			description: article.summary,
			images: [
				{
					url: article.coverImage,
					alt: article.title,
				},
			],
		},
	};
}

export async function generateStaticParams() {
	const articles: Article[] = await fetchArticles();
	return articles.map((article) => ({
		id: article.id,
	}));
}

async function page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const article: Article = await fetchArticleById(id);

	return (
		<main
			className="w-screen min-h-screen bg-grayBackground
			py-28 px-8
			sm:py-32 sm:px-16
			md:py-36 md:px-24
			lg:px-32
			xl:px-40
			2xl:px-[17rem]"
		>
			<ArticleDetail {...article} />
		</main>
	);
}

export default page;
