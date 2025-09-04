"use client";

import { useState } from "react";
import { Article, ArticleType } from "@/lib/definitions";
import Image from "next/image";
import Edit from "@/Components/ui/Edit";
import Delete from "@/Components/ui/Delete";

function Dashboard({
	initialArticles,
	deleteArticleHandler,
}: {
	initialArticles: Article[];
	deleteArticleHandler: (
		id: string
	) => Promise<{ success: boolean; message?: string }>;
}) {
	const types = {
		[ArticleType.Normal]: "Normal",
		[ArticleType.Secondary]: "Secundaria",
		[ArticleType.Main]: "Principal",
	};
	const colGap = "gap-x-8";
	const [articles, setArticles] = useState<Article[]>(initialArticles);

	const handleDelete = async (id: string) => {
		if (confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
			const result = await deleteArticleHandler(id);

			if (result.success) {
				setArticles((prevArticles) =>
					prevArticles.filter((article) => article.id !== id)
				);
				alert("Artículo eliminado con éxito");
			} else {
				alert("Error al eliminar el artículo:\n" + result.message);
			}
		}
	};
	return (
		<div className={`grid grid-cols-9 ${colGap} min-h-0 flex-1`}>
			<div
				className={`text-neutral-500 font-bold uppercase text-lg grid grid-cols-9 col-span-9 ${colGap} px-4 pb-2`}
			>
				<h1 className="col-span-1">Imagen</h1>
				<h1 className="col-span-2">Título</h1>
				<h1 className="col-span-4">Descripción</h1>
				<h1 className="col-span-2">Tipo</h1>
			</div>

			<div className="col-span-9 overflow-y-auto p-2">
				{articles.map((article: Article, idx: number) => (
					<div
						key={idx}
						className={`grid grid-cols-9 col-span-9 ${colGap} items-center p-4 rounded-3xl shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-shadow mb-4`}
					>
						<div className="col-span-1 relative aspect-square w-full max-w-[100px]">
							<Image
								className="object-cover rounded-3xl"
								src={article.coverImage}
								alt={article.title}
								fill
								sizes="(max-width: 768px) 100vw, 100px"
							/>
						</div>
						<h1 className="col-span-2 text-lg font-bold line-clamp-3">
							{article.title}
						</h1>
						<p className="col-span-4 line-clamp-4">
							{article.summary}
						</p>
						<p className="col-span-1 font-bold">
							{types[article.type]}
						</p>
						<div className="col-span-1 flex justify-end gap-x-4">
							<Edit
								className="bg-black rounded-full w-fit p-4"
								href={`/admin/noticias/actualizar/${article.id}`}
							/>
							<Delete
								className="bg-black rounded-full w-fit p-4"
								onClick={() => handleDelete(article.id)}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Dashboard;
