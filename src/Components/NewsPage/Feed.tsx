"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import { Article } from "@/lib/definitions";
import NewsCard from "../NewsSection/NewsCard";

function Feed({ startingArticles }: { startingArticles: Article[] }) {
	const [articles, setArticles] = useState<Article[]>(startingArticles);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [errorLoading, setErrorLoading] = useState(false);
	const hasMore = useRef(true);
	const loadingRef = useRef(false);

	const loadMore = useCallback(async () => {
		const isHalfway =
			window.innerHeight + window.scrollY >=
			document.body.offsetHeight / 2;

		if (!isHalfway || loadingRef.current || !hasMore.current) return;

		try {
			setIsLoading(true);
			loadingRef.current = true;
			const nextPage = page + 1;
			const { data } = await axios.get(
				`/api/articles?page=${nextPage}&limit=10`
			);

			if (data.length === 0 || data.length < 10) {
				hasMore.current = false;
			}

			if (data.length > 0) {
				const newArticles = data.map((article: Article) => ({
					...article,
					createdAt: new Date(article.createdAt),
					updatedAt: new Date(article.updatedAt),
				}));

				setArticles((prevArticles) => [
					...prevArticles,
					...newArticles,
				]);
				setPage(nextPage);
			}
			setErrorLoading(false);
		} catch (error) {
			console.error(
				"Error fetching more articles:",
				(error as Error).message
			);
			setErrorLoading(true);
		} finally {
			setIsLoading(false);
			loadingRef.current = false;
		}
	}, [page]);

	useEffect(() => {
		window.addEventListener("scroll", loadMore);

		return () => {
			window.removeEventListener("scroll", loadMore);
		};
	}, [loadMore]);

	return (
		<section className="py-16">
			<h2 className="uppercase font-black text-white text-4xl sm:text-4xl 2xl:text-6xl pr-16">
				Noticias
			</h2>

			<div
				className="pt-12 flex flex-col flex-nowrap gap-8 overflow-x-auto
                scrollbar-thin scrollbar-thumb-rounded
                scrollbar-track-gray-800 scrollbar-thumb-[#3BF3FF]"
			>
				{articles.map((article) => (
					<NewsCard
						key={article.id}
						article={article}
						isForFeed
						className="my-3 w-full h-1/6"
					/>
				))}
				{isLoading && (
					<div className="flex justify-center p-4 h-14">
						{" "}
						{/* Fixed height container */}
						<div className="w-6 h-6 border-2 border-[#3BF3FF] border-t-transparent rounded-full animate-spin"></div>
					</div>
				)}
				{errorLoading && (
					<>
						{!isLoading && (
							<div className="flex justify-center p-4 h-14">
								{" "}
								{/* Same fixed height */}
								<button
									onClick={loadMore}
									className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3BF3FF] hover:bg-[#2bc2cc] transition-colors"
									aria-label="Retry loading articles"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										className="w-4 h-4 text-grayBackground"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
								</button>
							</div>
						)}
						<p className="text-red-500 text-center">
							No se pudo cargar más artículos. Por favor,
							inténtalo de nuevo.
						</p>
					</>
				)}
			</div>
		</section>
	);
}

export default Feed;
