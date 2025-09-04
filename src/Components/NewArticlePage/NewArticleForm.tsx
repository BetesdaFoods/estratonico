import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	useMemo,
} from "react";
import { Article, ArticleType } from "@/lib/definitions";
import Button from "../ui/Button";
import dynamic from "next/dynamic";
import Image from "next/image";
import debounce from "lodash/debounce";
import { OutputData } from "@editorjs/editorjs";
import { PutBlobResult } from "@vercel/blob";
import axios from "axios";

// Dynamically import EditorJS with SSR disabled
const EditorJS = dynamic(() => import("@/Components/Editor/EditorJS"), {
	ssr: false,
});

// Memoize the entire component to prevent re-renders from parent
const NewArticleForm = React.memo(function NewArticleFormComponent({
	originalArticle,
	setArticle,
	onSubmit,
}: {
	originalArticle?: Article;
	setArticle: (article: Article) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
	const [loading, setLoading] = useState<boolean>(false);
	const [coverImage, setCoverImage] = useState<string>(
		originalArticle?.coverImage || ""
	);
	const [title, setTitle] = useState<string>(originalArticle?.title || "");
	const [summary, setSummary] = useState<string>(
		originalArticle?.summary || ""
	);
	const [content, setContent] = useState<string>(
		originalArticle?.content || ""
	);
	const [articleType, setArticleType] = useState<ArticleType>(
		originalArticle?.type || ArticleType.Normal
	);
	const [updateDate, setUpdateDate] = useState<boolean>(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Store the initialOutputData in a ref to keep it stable
	const initialEditorData = useRef<OutputData | undefined>(
		originalArticle ? JSON.parse(originalArticle.content) : undefined
	);

	useEffect(() => {
		setArticle({
			id: originalArticle?.id || "temp",
			author: originalArticle?.author || "Estratónico",
			createdAt: originalArticle?.createdAt || new Date(),
			updatedAt: updateDate
				? new Date()
				: originalArticle?.updatedAt || new Date(),
			deletedAt: null,
			type: articleType,
			coverImage,
			title,
			summary,
			content,
		});
	}, [
		coverImage,
		title,
		summary,
		content,
		setArticle,
		articleType,
		updateDate,
		originalArticle,
	]);

	const handleCoverImageChange = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (!file) return;

			// Only allow images
			if (!file.type.startsWith("image")) {
				alert("Solo se permiten imágenes");
				return;
			}

			// Upload the file to Vercel Blob
			try {
				const formData = new FormData();
				formData.append("file", file);
				const response = await axios.put("/upload", formData);
				const { url } = response.data as PutBlobResult;
				setCoverImage(url);
			} catch (error) {
				console.error("Error uploading file:", error);
			}
		},
		[]
	);

	// Debounce editor changes
	const debouncedHandleEditorChange = useMemo(
		() =>
			debounce((newData: OutputData) => {
				setContent(JSON.stringify(newData));
			}, 100),
		[]
	);

	// Clean up the debounced function
	useEffect(() => {
		return () => {
			debouncedHandleEditorChange.cancel();
		};
	}, [debouncedHandleEditorChange]);

	// Memoize the click handler
	const handleFileClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setLoading(true);
		try {
			await onSubmit(e);
		} catch (error) {
			setLoading(false);
			console.error("Error in form submission:", error);
		}
	};

	return (
		<form
			className="space-y-2 pt-3 px-6 rounded flex flex-col h-full"
			onSubmit={handleSubmit}
		>
			<div>
				<label className="block font-semibold text-xl mb-1">
					Imagen
				</label>
				<div
					className="relative w-[600px] h-[200px] cursor-pointer mb-2"
					onClick={handleFileClick}
				>
					<input
						ref={fileInputRef}
						required={!originalArticle}
						type="file"
						className="absolute opacity-0 w-full h-full z-0 cursor-pointer"
						onChange={handleCoverImageChange}
						accept="image/*"
						aria-label="Upload cover image"
					/>
					{coverImage ? (
						<div className="w-full h-full relative z-[8]">
							<Image
								src={coverImage}
								alt="Imagen seleccionada"
								fill
								className="object-cover rounded-lg"
								sizes="(max-width: 600px) 100vw, 600px"
							/>
							<div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-50 transition-all flex items-center justify-center">
								<span className="text-white text-sm">
									Cambiar imagen
								</span>
							</div>
						</div>
					) : (
						<div className="relative w-full h-full z-[8]">
							<Image
								src="/boton.svg"
								alt="Subir imagen"
								fill
								className="object-contain"
								sizes="(max-width: 600px) 100vw, 600px"
							/>
						</div>
					)}
				</div>
			</div>
			<div>
				<label className="block font-semibold text-xl">Titulo</label>
				<input
					required
					value={title}
					type="text"
					placeholder="Titulo"
					className="w-full p-2 border border-gray-300 rounded"
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div>
				<label className="block font-semibold text-xl">Resumen</label>
				<input
					required
					value={summary}
					type="text"
					placeholder="Resumen"
					className="w-full p-2 border border-gray-300 rounded"
					onChange={(e) => setSummary(e.target.value)}
				/>
			</div>
			<div className="flex items-center space-x-2">
				<label className="block font-semibold text-xl">Tipo</label>
				<select
					value={articleType}
					className="ml-2 p-2 border border-gray-300 rounded"
					onChange={(e) =>
						setArticleType(e.target.value as ArticleType)
					}
				>
					<option value={ArticleType.Normal}>Normal</option>
					<option value={ArticleType.Secondary}>Secundaria</option>
					<option value={ArticleType.Main}>Principal</option>
				</select>
			</div>
			{originalArticle && (
				<div className="flex items-center space-x-2">
					<label
						htmlFor="updateDate-checkbox"
						className="font-semibold text-xl flex items-center cursor-pointer select-none"
					>
						<span>Actualizar Fecha</span>
						<input
							id="updateDate-checkbox"
							type="checkbox"
							checked={updateDate}
							className="h-5 w-5 cursor-pointer ml-2"
							onChange={(e) => setUpdateDate(e.target.checked)}
						/>
					</label>
				</div>
			)}
			{!loading ? (
				<Button
					variant="black"
					sm
					className="uppercase py-3 px-8 w-fit self-end"
					submit
				>
					{originalArticle ? "Actualizar" : "Publicar"}
				</Button>
			) : (
				<Button
					variant="black"
					sm
					className="uppercase py-3 px-8 w-fit self-end"
					onClick={() => void 0}
				>
					{originalArticle ? "Actualizando..." : "Publicando..."}
				</Button>
			)}
			<div className="flex flex-col flex-grow">
				<label className="block font-semibold text-xl">Noticia</label>
				<div className="editor rounded-md border mb-6 flex-grow">
					<EditorJS
						key={originalArticle?.id || "new"}
						initialOutputData={initialEditorData.current}
						onChange={debouncedHandleEditorChange}
						editorBlock="editorjs-container"
					/>
				</div>
			</div>
		</form>
	);
});

export default NewArticleForm;
