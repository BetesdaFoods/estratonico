import { Article } from "@/lib/definitions";
import { formatDate } from "@/lib/utils";
import { OutputData } from "@editorjs/editorjs";
import ParserJS from "../Editor/ParserJS";
import Image from "next/image";

function ArticleDetail({
	coverImage,
	updatedAt,
	title,
	summary,
	content,
}: Article) {
	let parsedContent: OutputData | undefined = undefined;
	try {
		if (content) {
			parsedContent = JSON.parse(content) as OutputData;
		}
	} catch {
		parsedContent = undefined;
	}

	return (
		<>
			{coverImage && (
				<div className="relative aspect-[16/9] w-full overflow-hidden">
					<Image
						fill
						className="w-full h-full object-cover"
						src={coverImage}
						alt="Article cover image"
					/>
				</div>
			)}

			<div
				className="
					py-8 
					sm:py-10
					md:py-12
					lg:py-16
					xl:py-20
					2xl:py-32"
			>
				<p
					className="font-bold uppercase text-[#3BF3FF] self-start
						text-sm 
						sm:text-base 
						lg:text-lg 
						xl:text-xl 
						2xl:text-2xl
						mb-0 
						sm:mb-3
						md:mb-6"
				>
					{formatDate(updatedAt)}
				</p>
				<h1
					className="font-orbitron font-black uppercase
						text-3xl/snug
						sm:text-4xl/snug
						lg:text-5xl/snug
						xl:text-6xl/snug
						2xl:text-[4rem]/tight"
				>
					{title || "Sin título"}
				</h1>
			</div>
			<div
				className="text-justify
					space-y-8
					sm:space-y-10
					2xl:space-y-12
					text-base/tight
					sm:text-lg/tight
					md:text-xl/tight
					lg:text-2xl/tight
					xl:text-3xl/tight
					2xl:text-[2.272rem]/tight"
			>
				<p className="font-black">{summary || "Sin resumen"}</p>

				{content && !parsedContent ? (
					// OLD IMPLEMENTATION
					content.split("\n\n").map((paragraph: string, index) => (
						<p key={index} className="font-thin">
							{paragraph}
						</p>
					))
				) : parsedContent ? (
					// NEW IMPLEMENTATION
					<ParserJS
						data={parsedContent}
						className="article-content"
						customParsers={{
							// You can add custom parsers for specific block types
							codeBox: (block) => {
								return `<pre><code>${block.data.code}</code></pre>`;
							},
						}}
					/>
				) : (
					<p className="font-thin">Sin contenido</p>
				)}
			</div>
		</>
	);
}

export default ArticleDetail;
