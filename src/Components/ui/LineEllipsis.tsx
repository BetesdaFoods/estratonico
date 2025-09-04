function LineEllipsis({ className, sm }: { className?: string; sm?: boolean }) {
	return (
		<div className={className}>
			{/* Línea */}
			<div className="border-t-2 border-white flex-grow mr-4"></div>

			{/* Círculos */}
			<div className="p-2">
				<svg
					className={
						sm
							? `
						w-[40px] h-[9px] 
						sm:w-[55px] sm:h-[12px]
						md:w-[60px] md:h-[14px]`
							: `
						w-[40px] h-[9px] 
						sm:w-[55px] sm:h-[12px]
						md:w-[70px] md:h-[16px] 
						lg:w-[85px] lg:h-[19px] 
						xl:w-[100px] xl:h-[23px] 
						2xl:w-[130px] 2xl:h-[29px]`
					}
					viewBox="0 0 80 13"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="6.5" cy="6.5" r="6.5" fill="#D9D9D9" />
					<circle cx="40" cy="6.5" r="6.5" fill="#D9D9D9" />
					<circle cx="73.5" cy="6.5" r="6.5" fill="#D9D9D9" />
				</svg>
			</div>
		</div>
	);
}

export default LineEllipsis;
