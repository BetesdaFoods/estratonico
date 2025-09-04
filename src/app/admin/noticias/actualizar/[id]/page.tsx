"use client";

import { useState, useEffect, useRef } from "react";
import { Article } from "@/lib/definitions";
import NewArticleForm from "@/Components/NewArticlePage/NewArticleForm";
import ArticleDetail from "@/Components/ArticlePage/ArticleDetail";
import axios from "axios";
import { useRouter } from "next/navigation";

function Page({ params }: { params: Promise<{ id: string }> }) {
	const originalArticleRef = useRef<Article | undefined>(undefined);
	const [article, setArticle] = useState<Article | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchArticle = async () => {
			const { id } = await params;
			const response = await axios.get(`/api/articles/${id}`);
			const fetchedArticle = response.data;
			fetchedArticle.createdAt = new Date(fetchedArticle.createdAt);
			fetchedArticle.updatedAt = new Date(fetchedArticle.updatedAt);
			originalArticleRef.current = fetchedArticle;
			setArticle(fetchedArticle);
		};
		fetchArticle();
	}, [params]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!article) return;
		try {
			const { id } = await params;
			const response = await axios.put(`/api/articles/${id}`, article);
			const createdArticle = response.data;

			// Refresh router cache to get the updated article
			router.refresh();
			router.push(`/noticias/${createdArticle.id}`);
		} catch (error) {
			console.error("Error updating article:", error);
		}
	};

	return (
		<div className="pt-36 pb-8 bg-grayBackground min-h-[1300px] h-screen font-roboto flex flex-col justify-center items-center">
			<div className="w-full flex-grow relative">
				<div className="px-24 grid grid-cols-2 gap-16 absolute inset-0">
					<div className="overflow-y-auto bg-white text-black rounded-[2rem]">
						{article && (
							<NewArticleForm
								originalArticle={originalArticleRef.current}
								setArticle={setArticle}
								onSubmit={handleSubmit}
							/>
						)}
					</div>
					<div className="overflow-y-auto border-white border-2 rounded-[2rem] px-12">
						{article && <ArticleDetail {...article} />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Page;
