import { Article } from "@/lib/definitions";
import MostRecentArticle from "@/Components/NewsPage/MostRecentArticle";
import Feed from "@/Components/NewsPage/Feed";
import { fetchPaginatedArticles } from "@/lib/data";

async function page() {
	const articles: Article[] = await fetchPaginatedArticles(1, 10);
	const mostRecent: Article = articles.splice(0, 1)[0];
	return (
		<section className="px-8 pt-16 sm:pt-20 lg:pt-16 xl:pt-20 2xl:pt-36 md:px-16 lg:px-24 xl:px-32 bg-grayBackground">
			<MostRecentArticle article={mostRecent} />
			<Feed startingArticles={articles} />
		</section>
	);
}

export default page;
