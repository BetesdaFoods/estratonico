function VectorLinesGrafic({ only_line = false, className }: { only_line?: boolean, className?: string }) {
	return (
		<div className={className ?? ""}>
			{!only_line ? (
				<svg viewBox="0 0 158 152" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vector Lines Graphic" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}>
					<path d="M79.5 0L79.5 75L79.5 150" stroke="white"/>
					<circle cx="2" cy="150" r="1.5" stroke="white"/>
					<circle cx="156" cy="150" r="1.5" stroke="white"/>
					<path d="M3.5 150H154.5" stroke="white"/>
				</svg>
			) : (
				<svg viewBox="0 0 158 14" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vector Lines Graphic" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}>
					<circle cx="2" cy="12" r="1.5" stroke="white"/>
					<circle cx="156" cy="12" r="1.5" stroke="white"/>
					<path d="M3.5 12H154.5" stroke="white"/>
				</svg>
			)}
		</div>
	);
}

export default VectorLinesGrafic;
