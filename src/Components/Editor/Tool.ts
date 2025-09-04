import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Table from "@editorjs/table";
import Quote from "@editorjs/quote";
import Delimiter from "@editorjs/delimiter";
import Image from "@editorjs/image";
import { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import { PutBlobResult } from "@vercel/blob";
import axios from "axios";

// Define proper types for our tools collection
interface EditorTools {
	[key: string]: ToolConstructable | ToolSettings;
}

// Use proper type casting to avoid TypeScript errors
export const EDITOR_JS_TOOLS: EditorTools = {
	header: {
		class: Header as unknown as ToolConstructable,
		config: {
			placeholder: "Enter a header",
			levels: [1, 2, 3, 4, 5, 6],
			defaultLevel: 1,
		},
	},
	list: {
		class: List as unknown as ToolConstructable,
		inlineToolbar: true,
		config: {
			defaultStyle: "unordered",
		},
	},
	paragraph: {
		class: Paragraph as unknown as ToolConstructable,
		inlineToolbar: true,
	},
	table: {
		class: Table as unknown as ToolConstructable,
		inlineToolbar: true,
		config: {
			rows: 1,
			cols: 2,
		},
	},
	quote: {
		class: Quote as unknown as ToolConstructable,
		inlineToolbar: true,
	},
	delimiter: {
		class: Delimiter as unknown as ToolConstructable,
	},
	image: {
		class: Image as unknown as ToolConstructable,
		inlineToolbar: true,
		config: {
			placeholder: "Paste image URL or click to upload",
			captionPlaceholder: "Image caption",
			buttonContent: "Select an Image",
			uploader: {
				async uploadByFile(file: File) {
					// Only allow images
					if (!file.type.startsWith("image")) {
						console.error("Invalid file type");
						return Promise.reject();
					}

					try {
						const formData = new FormData();
						formData.append("file", file);
						const response = await axios.put("/upload", formData);
						const { url } = response.data as PutBlobResult;
						return {
							success: 1,
							file: {
								url,
							},
						};
					} catch (error) {
						console.error("Error uploading file:", error);
						return Promise.reject();
					}
				},
			},
		},
	},
};
