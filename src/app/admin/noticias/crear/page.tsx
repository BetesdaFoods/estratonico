"use client";

import { useState } from "react";
import { Article } from "@/lib/definitions";
import NewArticleForm from "@/Components/NewArticlePage/NewArticleForm";
import ArticleDetail from "@/Components/ArticlePage/ArticleDetail";
import axios from "axios";
import { useRouter } from "next/navigation";

function Page() {
	const [article, setArticle] = useState<Article | null>(null);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!article) return;
		try {
			const response = await axios.post("/api/articles", article);
			const createdArticle = response.data;
			router.push(`/noticias/${createdArticle.id}`);
		} catch (error) {
			console.error("Error creating article:", error);
		}
	};

	return (
		<div className="pt-36 pb-8 bg-grayBackground min-h-[1300px] h-screen font-roboto flex flex-col justify-center items-center">
			<div className="w-full flex-grow relative">
				<div className="px-24 grid grid-cols-2 gap-16 absolute inset-0">
					<div className="overflow-y-auto bg-white text-black rounded-[2rem]">
						<NewArticleForm
							setArticle={setArticle}
							onSubmit={handleSubmit}
						/>
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
