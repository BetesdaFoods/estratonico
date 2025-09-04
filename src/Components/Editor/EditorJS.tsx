import React, { memo, useEffect, useRef, useCallback } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./Tool";
import "./EditorJS.scss";

interface EditorProps {
	initialOutputData?: OutputData;
	onChange: (data: OutputData) => void;
	editorBlock: string;
	placeholder?: string;
}

const Editor: React.FC<EditorProps> = ({
	initialOutputData = { time: new Date().getTime(), blocks: [] },
	onChange,
	editorBlock,
	placeholder = "Empieza a escribir aquí...",
}) => {
	const ref = useRef<EditorJS | null>(null);

	const handleChange = useCallback(
		async (api: { saver: { save: () => Promise<OutputData> } }) => {
			const data = await api.saver.save();
			onChange(data);
		},
		[onChange]
	);

	useEffect(() => {
		if (!ref.current) {
			const editor = new EditorJS({
				holder: editorBlock,
				data: initialOutputData,
				tools: EDITOR_JS_TOOLS,
				placeholder: placeholder,
				onChange: handleChange,
			});
			ref.current = editor;
		}

		return () => {
			if (ref.current && ref.current.destroy) {
				ref.current.destroy();
				ref.current = null;
			}
		};
	}, [editorBlock, handleChange, initialOutputData, placeholder]);

	return <div id={editorBlock} />;
};

export default memo(Editor);
