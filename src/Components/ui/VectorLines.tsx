function VectorLines({ flip = false }: { flip?: boolean }) {
	return (
		<svg
			width="512"
			height="30"
			viewBox="0 0 512 30"
			fill="none"
			strokeWidth={2}
			xmlns="http://www.w3.org/2000/svg"
			className="w-[290px] md:w-[400px] lg:w-[312px] xl:w-[512px]"
		>
			<g transform={flip ? "rotate(180, 256, 15)" : ""}>
				<path d="M1 10L21 30H491.5L511.5 10" stroke="white" />
				<path d="M220 3H290.909" stroke="white" />
				<circle cx="217.5" cy="3.5" r="3" stroke="white" />
				<circle cx="293.5" cy="3.5" r="3" stroke="white" />
			</g>
		</svg>
	);
}

export default VectorLines;
