import MainArticle from "@/Components/NewsPage/MainArticle";
import NewsTimeline from "@/Components/NewsPage/NewsTimeline";
import { fetchOrganizedArticles } from "@/lib/data";

export async function generateMetadata() {
	const articles = await fetchOrganizedArticles();

	return {
		title: "Noticias",
		description: "Las últimas noticias de Estratónico",
		openGraph: {
			title: "Noticias - Estratónico",
			description: "Las últimas noticias de Estratónico",
			type: "website",
			url: "https://estratonico.com/noticias",
			images: [
				{
					url: articles.main.coverImage,
					width: 1200,
					height: 630,
					alt: "Estratónico preview image",
				},
			],
		},
	};
}

async function page() {
	const articles = await fetchOrganizedArticles();
	return (
		<main>
			<MainArticle article={articles.main} />
			<NewsTimeline articles={articles} />
		</main>
	);
}

export default page;
