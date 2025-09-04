import Image from "next/image";
import Button from "../ui/Button";
import { Article } from "@/lib/definitions";
import { formatDate, truncateText } from "@/lib/utils";

function MainArticle({ article }: { article: Article }) {
	return (
		<section className="w-screen min-h-screen lg:h-screen lg:min-h-[650px] xl:min-h-[750px] 2xl:min-h-[900px] flex flex-col items-center justify-center relative md:pt-32 xl:pt-16">
			<Image
				id="banner-img"
				fill
				className="-z-10 top-0 left-0 absolute w-screen min-h-screen object-cover object-center"
				src={article.coverImage}
				alt="Hero background"
			/>

			<div className="flex flex-col justify-center items-center px-14 lg:px-32 xl:px-44">
				<p className="font-bold text-xs sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl uppercase text-[#3BF3FF] self-start mb-3 md:mb-6 2xl:mb-10 text-shadow-glow">
					{formatDate(article.updatedAt)}
				</p>

				<h1 className="text-3xl sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-snug xl:text-5xl xl:leading-snug 2xl:text-[4rem] 2xl:leading-tight font-orbitron font-black uppercase sm:pr-12 md:pr-24 lg:pr-32 2xl:pr-96 text-shadow-md">
					<span className="line-clamp-5 lg:line-clamp-3">
						{article.title}
					</span>
				</h1>

				<p className="py-8 font-normal text-sm sm:text-base md:text-lg lg:text-xl xl:text-3xl sm:pr-12 md:pr-24 lg:pr-32 xl:pr-96 text-shadow-md">
					<span className="md:line-clamp-3">
						{truncateText(article.summary, 300)}
					</span>
				</p>

				<Button
					href={`/noticias/${article.id}`}
					className="uppercase py-4 px-10 xl:px-12 xl:py-6 font-orbitron
										 font-black self-start
										 text-base md:text-lg lg:text-xl xl:text-2xl
										 text-shadow-sm"
				>
					Leer Artículo
				</Button>
			</div>
		</section>
	);
}

export default MainArticle;
