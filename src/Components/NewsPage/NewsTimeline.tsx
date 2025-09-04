import { Article } from "@/lib/definitions";
import SecondaryArticle from "./SecondaryArticle";
import LatestNews from "./LatestNews";

function NewsTimeline({
	articles,
}: {
	articles: { main: Article; secondary: Article; latest: Article[] };
}) {
	return (
		<section className="px-8 md:px-16 lg:px-32 xl:px-36 bg-grayBackground">
			<SecondaryArticle article={articles.secondary} />
			<LatestNews articles={articles.latest} />
		</section>
	);
}

export default NewsTimeline;
