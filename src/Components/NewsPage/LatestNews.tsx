"use client";
import { Article } from "@/lib/definitions";
import NewsCard from "../NewsSection/NewsCard";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { closestMultipleGreaterOrEqual } from "@/lib/utils";

function LatestNews({ articles }: { articles: Article[] }) {
	const [visibleCount, setVisibleCount] = useState(3);

	const loadMore = () => {
		setVisibleCount((prev) => prev + 3);
	};

	return (
		<section className="py-8">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-end">
				<h2 className="uppercase font-black text-white text-4xl sm:text-4xl 2xl:text-6xl pr-16">
					Últimas Noticias
				</h2>
				<Link
					href="/noticias/ultimas-noticias"
					className="flex items-center text-[#3BF3FF] font-bold xl:font-black text-nowrap sm:ml-2 xl:text-lg 2xl:text-2xl hover:underline hover:cursor-pointer select-none transform transition-transform duration-300 hover:xl:scale-105"
				>
					VER MÁS{" "}
					<Image
						className="ml-2"
						src="/assets/news-right-arrow.svg"
						alt="arrow"
						width={15}
						height={13}
					/>
				</Link>
			</div>

			<div className="pt-20">
				{/* Mobile scrollable version */}
				<div
					className="flex flex-nowrap gap-8 overflow-x-auto lg:hidden
                scrollbar-thin scrollbar-thumb-rounded
                scrollbar-track-gray-800 scrollbar-thumb-[#3BF3FF]"
				>
					{articles.map((article) => (
						<NewsCard
							key={article.id}
							article={article}
							isforNews
							className="lg:w-[30vw] md:w-[33vw] sm:w-[40vw] w-[64vw] flex-shrink-0"
						/>
					))}
				</div>

				{/* Desktop grid version */}
				<div className="hidden lg:grid grid-cols-3 gap-8 xl:gap-20">
					{articles
						.slice(
							0,
							closestMultipleGreaterOrEqual(visibleCount, 3)
						)
						.map((article) => (
							<NewsCard
								key={article.id}
								article={article}
								isOtherNews
							/>
						))}
				</div>
			</div>
			{visibleCount < articles.length && (
				<div className="hidden lg:flex justify-center mt-6">
					<button
						onClick={loadMore}
						className="flex items-center justify-center w-32 h-32  transition duration-300 mt-7"
					>
						<svg
							width="80"
							height="80"
							viewBox="0 0 52 52"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M3 26L49 26"
								stroke="white"
								strokeWidth="6"
								strokeLinecap="round"
							/>
							<path
								d="M26 3V49"
								stroke="white"
								strokeWidth="6"
								strokeLinecap="round"
							/>
						</svg>
					</button>
				</div>
			)}
		</section>
	);
}

export default LatestNews;
