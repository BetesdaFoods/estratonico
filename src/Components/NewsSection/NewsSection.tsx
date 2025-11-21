import NewsCard from "./NewsCard";
import Image from "next/image";
import { Article } from "@/lib/definitions";
import { fetchArticles } from "@/lib/data";
import Link from "next/link";
import ReadArticleButton from "./ReadArticleButton";
import DateFormatter, { NoticiasTitle, SeeMoreButton } from "./CommonComponents";

async function NewsSection() {
	const articles: Article[] = await fetchArticles();
	const latest = articles[0];

	return (
		<section className="bg-blackBackground text-white items-stretch px-8 py-0 lg:px-20 pb-16 lg:pb-12 xl:px-36 xl:pb-20 pt-8 lg:pt-15 xl:pt-22">
    		{/* LATEST ARTICLE */}
			<Link
				href={`/noticias/${latest.id}`}
				className="relative lg:flex flex-col lg:w-full h-auto transition-transform duration-300 group hover:cursor-pointer select-none"
			>
				<div className="flex justify-between">
					<span className="w-full lg:max-w-[75%] xl:max-w-[70%] flex flex-col">
						<h1 className="text-1xl lg:text-2xl xl:text-[22px] py-2 xl:py-2 text-[#3BF3FF]">
							<DateFormatter dateString={latest.updatedAt} />
						</h1>
						<h3 className="uppercase font-[900] lg:font-[900] xl:font-bold leading-tight text-2xl lg:text-[40px] xl:text-[40px] group-hover:underline text-shadow-md">
							{latest.title}
						</h3>
						<h1 className="text-[12px] lg:text-[22px] xl:text-[20px] mt-1 lg:mt-2 xl:mt-3 mb-1 lg:mb-4 xl:mb-6 group-hover:underline text-shadow-md lg:font-medium xl:font-normal">
							{latest.summary}
						</h1>
					</span>
					{/* ReadArticleButton moved outside Link to avoid nested anchor (<a> inside <a>) */}
					<span className="relative hidden sm:block items-center px-0 py-14 bottom-6">
						{/* placeholder: button moved outside link */}
					</span>
				</div>
				<div className="relative w-full max-h-[200px] lg:max-h-[500px] xl:max-h-[480px] aspect-[742/695]">
					<Image
						src={latest.coverImage}
						alt="Estratonico"
						fill
						className="rounded-3xl lg:rounded-[60px] xl:rounded-3xl object-cover"
					/>
				</div>
			</Link>
			{/* Place ReadArticleButton outside the Link to avoid nested <a> elements */}
			<div className="relative hidden sm:block items-center px-0 py-14 bottom-6">
				<ReadArticleButton link={`/noticias/${latest.id}`} />
			</div>

			{/* NEWS TIMELINE */}
			<div className="w-full pt-4 lg:pt-8 xl:pt-14 h-auto flex flex-col">
				{/* LINK - SEE MORE */}
				<div className="flex justify-between mb-6 sm:px-3 lg:pl-0 xl:pb-3 2xl:pb-6">
					<NoticiasTitle />
					<SeeMoreButton link="/noticias/ultimas-noticias" />
				</div>
				{/* ARTICLES */}
				<div className="lg:hidden xl:hidden flex flex-col gap-5 lg:gap-9 2xl:gap-12">
					{Array.from({ length: Math.ceil(Math.min(6, articles.length) / 2) }).map((_, idx) => {
						const start = idx * 2;
						const pair = articles.slice(start, start + 2);
						return (
							<div key={idx} className="flex  sm:flex-row gap-4 lg:gap-5 2xl:gap-12 flex-1 justify-evenly">
								{pair.map((article) => (
									<NewsCard key={article.id} article={article} />
								))}
							</div>
						);
					})}
				</div>
				<div className="lg:flex xl:hidden flex-col gap-9 2xl:gap-12 hidden flex-1 justify-evenly">
						{Array.from({ length: Math.min(2, Math.ceil(Math.min(6, articles.length) / 3)) }).map((_, idx) => {
						const start = idx * 3;
						const trio = articles.slice(start, start + 3);
						return (
							<div key={idx} className="flex lg:flex-row gap-5 2xl:gap-12 flex-1 justify-evenly">
								{trio.map((article) => (
									<NewsCard key={article.id} article={article} />
								))}
							</div>
						);
					})}
				</div>
				<div className="xl:flex flex-col gap-9 2xl:gap-10 hidden flex-1 justify-evenly">
					{Array.from({ length: Math.ceil(Math.min(6, articles.length) / 4) }).map((_, idx) => {
						const start = idx * 4;
						const cuarteto = articles.slice(start, start + 4);
						return (
							<div key={idx} className="flex xl:flex-row gap-5 2xl:gap-10 flex-1 justify-evenly">
								{cuarteto.map((article) => (
									<NewsCard key={article.id} article={article} />
								))}
							</div>
						);
					})}
				</div>
			</div>
    	</section>
  	);
}

export default NewsSection;