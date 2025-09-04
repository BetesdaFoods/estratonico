import React from "react";
import edjsParser from "editorjs-parser";
import { OutputData } from "@editorjs/editorjs";
import "./ParserJS.scss"; // Optional styling

interface EditorJSBlock {
	data: Record<string, unknown>;
	type: string;
	id?: string;
}

interface ListItem {
	content: string;
	meta?: Record<string, string | number | boolean | null | undefined>;
	items?: ListItem[];
}

interface ParserProps {
	data: OutputData;
	className?: string;
	customParsers?: Record<string, (block: EditorJSBlock) => string>;
}

const ParserJS: React.FC<ParserProps> = ({
	data,
	className = "",
	customParsers = {},
}) => {
	// Initialize parser once
	const parser = React.useMemo(() => {
		// Note: First argument is config, second is custom parsers
		const instance = new edjsParser(
			{
				image: {
					withBackground: false,
					withBorder: false,
					stretched: false,
				},
				paragraph: {
					pClass: "editorjs-paragraph",
				},
				list: {
					ulClass: "editorjs-list editorjs-unordered",
					olClass: "editorjs-list editorjs-ordered",
				},
			},
			{
				list: (data: {
					style: "ordered" | "unordered";
					items: ListItem[];
				}) => {
					// Function to recursively process list items
					const processListItems = (items: ListItem[]): string => {
						if (!items || !items.length) return "";

						return items
							.map((item) => {
								// Handle the main content
								let content = "";
								if (typeof item === "string") {
									content = item;
								} else if (item && typeof item === "object") {
									content =
										item.content || JSON.stringify(item);
								}

								// Check for nested items
								let nestedList = "";
								if (item.items && item.items.length > 0) {
									const nestedListType =
										data.style === "ordered" ? "ol" : "ul";
									nestedList = `<${nestedListType} class="editorjs-nested-list">${processListItems(
										item.items
									)}</${nestedListType}>`;
								}

								return `<li>${content}${nestedList}</li>`;
							})
							.join("");
					};

					const listType = data.style === "ordered" ? "ol" : "ul";
					const listClass =
						data.style === "ordered"
							? "editorjs-list editorjs-ordered"
							: "editorjs-list editorjs-unordered";
					const items = processListItems(data.items);

					return `<${listType} class="${listClass}">${items}</${listType}>`;
				},
				delimiter: () => {
					return '<hr class="editorjs-delimiter" />';
				},
			}
		);

		// Add any custom parsers passed in props
		Object.keys(customParsers).forEach((type) => {
			instance.parse[type] = customParsers[type];
		});

		return instance;
	}, [customParsers]);

	// Parse the EditorJS output data
	const parsedHtml = React.useMemo(() => {
		if (!data || !data.blocks || !data.blocks.length) {
			return "";
		}

		try {
			return parser.parse(data);
		} catch (error) {
			console.error("Error parsing EditorJS data:", error);
			return "<p>Error parsing content</p>";
		}
	}, [data, parser]);

	return (
		<div
			className={`editorjs-parser ${className}`}
			dangerouslySetInnerHTML={{ __html: parsedHtml }}
		/>
	);
};

export default ParserJS;
