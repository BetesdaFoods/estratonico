function Edit({ className, href }: { className?: string; href: string }) {
	const icon = (
		<svg
			width="24"
			height="24"
			viewBox="0 0 46 46"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M5.71875 32.8819V40.0302H12.867L33.9496 18.9476L26.8013 11.7994L5.71875 32.8819ZM39.4776 13.4196C40.221 12.6762 40.221 11.4753 39.4776 10.7319L35.017 6.27137C34.2736 5.52795 33.0727 5.52795 32.3293 6.27137L28.841 9.75972L35.9892 16.908L39.4776 13.4196Z"
				fill="white"
			/>
		</svg>
	);
	return (
		<a
			href={href}
			className={`inline-flex items-center justify-center transition-transform hover:scale-105 ${className}`}
		>
			{icon}
		</a>
	);
}

export default Edit;
