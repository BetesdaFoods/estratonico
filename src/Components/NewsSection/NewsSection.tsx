import NewsCard from "./NewsCard";
import Image from "next/image";
import { Article } from "@/lib/definitions";
import { fetchArticles } from "@/lib/data";
import Link from "next/link";

async function NewsSection() {
	const articles: Article[] = await fetchArticles();
	const latest = articles[0];
	return (
		<section className="bg-grayBackground text-white lg:flex items-stretch px-8 py-10 sm:px-16 md:px-20 2xl:px-36 2xl:py-36">
			{/* LATEST ARTICLE */}
			<Link
				href={`/noticias/${latest.id}`}
				className="relative hidden lg:flex justify-center lg:w-6/12 h-auto transform transition-transform duration-300 group hover:scale-105 hover:cursor-pointer select-none"
			>
				<div className="relative w-full aspect-[742/695]">
					<Image
						src={latest.coverImage}
						alt="Estratonico"
						fill
						className="rounded-3xl object-cover"
					/>
				</div>

				<h3 className="absolute left-6 uppercase bottom-11 font-bold leading-tight text-5xl xl:text-6xl 2xl:text-[4.35rem] px-10 2xl:px-5 group-hover:underline text-shadow-md">
					{latest.title}
				</h3>
			</Link>

			{/* NEWS TIMELINE */}
			<div className="sm:px-4 md:px-8 lg:ml-6 lg:w-6/12 h-auto flex flex-col">
				{/* LINK - SEE MORE */}
				<div className="flex flex-col mb-6 sm:px-3 lg:pl-0 lg:pr-8 xl:pr-10 xl:pb-3 2xl:pb-6">
					<h3 className="text-3xl sm:text-4xl font-bold text-nowrap 2xl:text-6xl">
						ÚLTIMAS NOTICIAS
					</h3>
					<Link
						href="/noticias/ultimas-noticias"
						className="flex items-center text-[#3BF3FF] font-bold xl:font-black text-nowrap xl:text-lg 2xl:text-2xl hover:underline hover:cursor-pointer select-none transform transition-transform duration-300 hover:xl:scale-105 origin-[0%_50%]"
					>
						VER MÁS
						<Image
							className="ml-2"
							src="/assets/news-right-arrow.svg"
							alt="arrow"
							width={15}
							height={13}
						/>
					</Link>
				</div>
				{/* ARTICLES */}
				<div className="flex flex-col gap-9 2xl:gap-12 lg:hidden flex-1 justify-evenly">
					{articles.slice(0, 3).map((article) => (
						<NewsCard key={article.id} article={article} />
					))}
				</div>
				<div className="lg:flex flex-col gap-9 2xl:gap-12 hidden flex-1 justify-evenly">
					{articles.slice(1, 3).map((article) => (
						<NewsCard key={article.id} article={article} />
					))}
				</div>
			</div>
		</section>
	);
}

export default NewsSection;
