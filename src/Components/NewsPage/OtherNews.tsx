"use client";
import { useState } from "react";
import { Article } from "@/lib/definitions";
import NewsCard from "../NewsSection/NewsCard";
import { closestMultipleGreaterOrEqual } from "@/lib/utils";
import LineEllipsis from "../ui/LineEllipsis";

function OtherNews({ articles }: { articles: Article[] }) {
	const [visibleCount, setVisibleCount] = useState(3);

	const loadMore = () => {
		setVisibleCount((prev) => prev + 3);
	};

	return (
		<>
			<section className="py-8 flex flex-col">
				<div className="">
					<div className="flex items-center w-full mb-7 lg:mb-10">
						{/* Texto */}
						<h1 className="uppercase font-black text-white text-4xl sm:text-4xl 2xl:text-6xl pr-16">
							Otras Noticias
						</h1>

						{/* Contenedor para la línea + puntos (solo en tamaños md en adelante) */}
						<LineEllipsis className="hidden sm:flex items-center ml-4 flex-grow" />
					</div>

					<div className="grid sm:hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-20">
						{articles
							.slice(
								0,
								closestMultipleGreaterOrEqual(visibleCount, 3)
							)
							.map((article) => (
								<NewsCard
									key={article.id}
									article={article}
									summaryOff
									isOtherNews={true}
								/>
							))}
					</div>
					<div className="hidden sm:grid lg:hidden grid-cols-2 gap-8">
						{articles
							.slice(
								0,
								closestMultipleGreaterOrEqual(visibleCount, 2)
							)
							.map((article) => (
								<NewsCard
									key={article.id}
									article={article}
									summaryOff
									isOtherNews={true}
								/>
							))}
					</div>
				</div>

				{visibleCount < articles.length && (
					<div className="flex justify-center mt-6">
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
		</>
	);
}

export default OtherNews;
