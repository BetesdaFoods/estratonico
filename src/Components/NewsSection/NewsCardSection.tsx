import React from "react";
import Image from "next/image";
import { Article } from "@/lib/definitions";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

function NewsCard({ article }: { article: Article }) {
	return (
		<Link
			href={`/noticias/${article.id}`}
			className="flex flex-col items-center lg:flex-row w-full transform transition-transform duration-300 group hover:scale-105 hover:cursor-pointer select-none"
		>
			<div className="relative aspect-[16/9] w-full lg:w-6/12 rounded-3xl overflow-hidden">
				<Image
					src={article.coverImage}
					alt="Noticia Estratonico"
					fill
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="px-4 w-full lg:w-6/12 mt-4 lg:mt-0">
				<p className="text-[#3BF3FF] text-xs uppercase xl:text-sm 2xl:text-base">
					{formatDate(article.updatedAt)}
				</p>
				<h4 className="text-2xl font-bold w-full overflow-hidden whitespace-nowrap text-ellipsis md:text-2xl lg:text-xl xl:text-2xl 2xl:text-4xl pt-2 group-hover:underline">
					{article.title}
				</h4>
				<div className="font-light text-xs sm:text-sm md:text-base 2xl:text-xl line-clamp-3 lg:line-clamp-2 xl:line-clamp-3 group-hover:underline">
					{article.summary}
				</div>
			</div>
		</Link>
	);
}

export default NewsCard;
