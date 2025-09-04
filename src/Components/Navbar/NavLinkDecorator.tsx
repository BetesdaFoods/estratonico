function NavLinkDecorator({ className = "" }) {
	return (
		<>
			{/* Top SVG */}
			<svg
				className={`origin-top-left absolute -top-3 -left-4 ${className}`}
				width="85"
				height="12"
				viewBox="0 0 85 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M79 4L8.09091 3.99999L0.999998 11"
					stroke="white"
					strokeWidth="1"
				/>
				<circle
					cx="81.5"
					cy="3.5"
					r="3"
					transform="rotate(-180 81.5 3.5)"
					stroke="white"
					strokeWidth="1"
				/>
			</svg>

			{/* Bottom SVG */}
			<svg
				className={`origin-bottom-right absolute -bottom-3 -right-4 ${className}`}
				width="85"
				height="12"
				viewBox="0 0 85 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g transform="rotate(180 42.5 6)">
					<path
						d="M79 4L8.09091 3.99999L0.999998 11"
						stroke="white"
						strokeWidth="1"
					/>
					<circle
						cx="81.5"
						cy="3.5"
						r="3"
						transform="rotate(-180 81.5 3.5)"
						stroke="white"
						strokeWidth="1"
					/>
				</g>
			</svg>
		</>
	);
}

export default NavLinkDecorator;
