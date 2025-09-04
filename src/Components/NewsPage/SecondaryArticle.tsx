import { Article } from "@/lib/definitions";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Button from "../ui/Button";

function SecondaryArticle({ article }: { article: Article }) {
	return (
		<section className="flex flex-col gap-12 py-16 sm:py-20 sm:flex-row">
			<div className="relative aspect-[16/9] w-full sm:w-1/2">
				<Image
					src={article.coverImage}
					alt="cover image"
					fill
					className="w-full h-full object-cover rounded-3xl lg:rounded-[3rem]"
				/>
			</div>
			<div className="sm:w-1/2 flex flex-col justify-between">
				<p className="uppercase text-xs lg:text-lg xl:text-2xl text-[#3BF3FF] font-bold mb-3">
					{formatDate(article.updatedAt)}
				</p>
				<p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl lg:leading-tight lg:py-6 xl:text-6xl xl:leading-tight uppercase font-black line-clamp-3">
					{article.title}
				</p>
				<p className="py-3 sm:text-xl lg:text-2xl xl:text-3xl font-medium">
					<span className="line-clamp-3">{article.summary}</span>
				</p>
				<Button
					href={`/noticias/${article.id}`}
					className="uppercase py-4 px-14 sm:px-7 sm:py-6 lg:px-12 font-orbitron sm:text-2xl font-black self-start mt-6"
				>
					Leer Artículo
				</Button>
			</div>
		</section>
	);
}

export default SecondaryArticle;
