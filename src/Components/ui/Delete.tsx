"use client";

function Delete({
	className,
	onClick,
}: {
	className?: string;
	onClick: () => void;
}) {
	const icon = (
		<svg
			width="24"
			height="24"
			viewBox="0 0 46 46"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M13.125 39.375C12.0937 39.375 11.2109 39.0078 10.4766 38.2734C9.74219 37.5391 9.375 36.6563 9.375 35.625V11.25H7.5V7.5H16.875V5.625H28.125V7.5H37.5V11.25H35.625V35.625C35.625 36.6563 35.2578 37.5391 34.5234 38.2734C33.7891 39.0078 32.9063 39.375 31.875 39.375H13.125ZM31.875 11.25H13.125V35.625H31.875V11.25ZM16.875 31.875H20.625V15H16.875V31.875ZM24.375 31.875H28.125V15H24.375V31.875Z"
				fill="#FEF7FF"
			/>
		</svg>
	);
	return (
		<a
			className={`inline-flex items-center justify-center transition-transform cursor-pointer hover:scale-105 ${className}`}
			onClick={(e) => {
				e.preventDefault();
				onClick();
			}}
		>
			{icon}
		</a>
	);
}

export default Delete;
