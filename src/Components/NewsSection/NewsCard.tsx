import React from "react";
import Image from "next/image";
import { Article } from "@/lib/definitions";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import DateFormatter from "./CommonComponents";

function NewsCard({
	article,
	summaryOff = false,
	isforNews = false,
	isOtherNews = false,
	isForFeed = false,
	className = "",
}: {
	article: Article;
	summaryOff?: boolean;
	isforNews?: boolean;
	isOtherNews?: boolean;
	isForFeed?: boolean;
	className?: string;
}) {
	if (isforNews) {
		return (
			<Link
				href={`/noticias/${article.id}`}
				className={`${className} flex flex-col items-center w-full transform transition-transform duration-300 group xl:hover:scale-105 hover:cursor-pointer select-none`}
			>
				<div className="relative aspect-[16/9] w-full sm:h-[20vh] xl:h-[30vh] overflow-hidden">
					<Image
						src={article.coverImage}
						alt="Noticia Estratonico"
						fill
						className="w-full h-full object-cover rounded-3xl xl:rounded-[2rem] 2xl:rounded-[3rem]"
					/>
				</div>

				<div className="px-4 w-full mt-4">
					{!summaryOff && (
						<p className="text-[#3BF3FF] text-sm uppercase">
							{formatDate(article.updatedAt)}
						</p>
					)}
					<h4 className="text-3xl font-black w-full overflow-hidden whitespace-nowrap text-ellipsis md:text-4xl py-6 group-hover:underline">
						{article.title}
					</h4>
					{!summaryOff && (
						<div className="font-light text-lg sm:text-sm md:text-base lg:text-xl line-clamp-3 lg:line-clamp-4 group-hover:underline">
							{article.summary}
						</div>
					)}

					{summaryOff && (
						<p className="text-[#3BF3FF] text-xs uppercase xl:text-sm 2xl:text-base">
							{formatDate(article.updatedAt)}
						</p>
					)}
				</div>
			</Link>
		);
	} else if (isOtherNews) {
		return (
			<Link
				href={`/noticias/${article.id}`}
				className={`${className} flex flex-col w-full transform transition-transform duration-300 group xl:hover:scale-105 hover:cursor-pointer select-none`}
			>
				<div className="relative aspect-[16/9] w-full overflow-hidden">
					<Image
						src={article.coverImage}
						alt="Noticia Estratonico"
						fill
						className="w-full h-full object-cover rounded-3xl xl:rounded-[2rem] 2xl:rounded-[3rem]"
					/>
				</div>

				<div className="px-4 w-full mt-4 lg:mt-0">
					{!summaryOff && (
						<p className="text-[#3BF3FF] text-xs uppercase xl:text-sm 2xl:text-base">
							{formatDate(article.updatedAt)}
						</p>
					)}
					<h4 className="text-2xl font-black w-full overflow-hidden whitespace-nowrap text-ellipsis md:text-2xl lg:text-3xl xl:text-2xl 2xl:text-4xl pt-2 group-hover:underline">
						{article.title}
					</h4>
					{!summaryOff && (
						<div className="font-light text-xs sm:text-sm md:text-base line-clamp-3 group-hover:underline">
							{article.summary}
						</div>
					)}

					{summaryOff && (
						<p className="text-[#3BF3FF] text-xs uppercase xl:text-sm 2xl:text-base">
							{formatDate(article.updatedAt)}
						</p>
					)}
				</div>
			</Link>
		);
	} else if (isForFeed) {
		return (
			<Link
				href={`/noticias/${article.id}`}
				className={`${className} flex flex-col items-center sm:flex-row w-full transform transition-transform duration-300 group hover:cursor-pointer select-none`} // Las imagenes cuando se aumentan de tamaño se cortan
			>
				<div className="relative aspect-[16/9] w-full sm:w-1/2 overflow-hidden">
					<Image
						src={article.coverImage}
						alt="Noticia Estratonico"
						fill
						className="w-full h-full object-cover rounded-3xl xl:rounded-[2rem] 2xl:rounded-[3rem]"
					/>
				</div>

				<div className="px-4 w-full mt-4 sm:mt-0 sm:ml-2 lg:ml-4 xl:ml-8 2xl:ml-12">
					{!summaryOff && (
						<p className="text-[#3BF3FF] text-xs uppercase xl:text-sm 2xl:text-base">
							{formatDate(article.updatedAt)}
						</p>
					)}
					<h4 className="text-2xl font-black w-full overflow-hidden whitespace-nowrap text-ellipsis md:text-2xl sm:text-xl xl:text-2xl 2xl:text-4xl pt-2 group-hover:underline">
						{article.title}
					</h4>
					{!summaryOff && (
						<div className="font-light text-xs sm:text-sm md:text-base 2xl:text-xl line-clamp-3 sm:line-clamp-2 xl:line-clamp-3 group-hover:underline">
							{article.summary}
						</div>
					)}

					{summaryOff && (
						<p className="text-[#3BF3FF] text-xs uppercase xl:text-sm 2xl:text-base">
							{formatDate(article.updatedAt)}
						</p>
					)}
				</div>
			</Link>
		);
	}

	return (
		<Link
			href={`/noticias/${article.id}`}
			className={`${className} flex flex-col items-center w-[48%] lg:w-[32%] xl:w-[23%] transform transition-transform duration-300 group xl:hover:scale-105 hover:cursor-pointer select-none`}
		>
			<div className="relative aspect-[16/9] w-full overflow-hidden">
				<Image
					src={article.coverImage}
					alt="Noticia Estratonico"
					fill
					className="w-full h-full object-cover rounded-3xl xl:rounded-[2rem] 2xl:rounded-[3rem]"
				/>
			</div>

			<div className="w-full mt-4 lg:mt-2">
				{!summaryOff && (
					<p className="text-[#3BF3FF] text-xs uppercase xl:text-sm 2xl:text-base">
						<DateFormatter dateString={article.updatedAt} />
					</p>
				)}
				<h4 className="text-2xl font-black w-full overflow-hidden whitespace-nowrap text-ellipsis md:text-2xl lg:text-xl xl:text-2xl 2xl:text-4xl pt-2 group-hover:underline">
					{article.title}
				</h4>
				{!summaryOff && (
					<div className="font-light text-xs sm:text-sm md:text-base 2xl:text-xl line-clamp-3 lg:line-clamp-2 xl:line-clamp-3 group-hover:underline">
						{article.summary}
					</div>
				)}

				{summaryOff && (
					<p className="text-[#3BF3FF] text-xs uppercase xl:text-sm 2xl:text-base">
						{formatDate(article.updatedAt)}
					</p>
				)}
			</div>
		</Link>
	);
}

export default NewsCard;
