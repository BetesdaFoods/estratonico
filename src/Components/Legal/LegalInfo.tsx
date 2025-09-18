interface LegalInfoProps {
	info: {
		title: string;
		description: string;
		date: Date;
	};
}

function LegalInfo({ info: {title, description, date} }: LegalInfoProps) {
	return (
		<div className="h-full text-white bg-grayBackground flex flex-col items-center pb-32 sm:pb-52 px-10 sm:px-24 md:px-40 lg:px-52 xl:px-72">
			<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase text-center my-12 sm:my-16 lg:my-20 xl:my-24 font-orbitron">
				{title}
			</h1>
			<div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl space-y-6 sm:space-y-9">
				<h2 className="font-bold">
					Última vez actualizado el 17/09/2025
				</h2>
				{description.split(/\n+/).map((paragraph, index) => (
					<p
						key={index}
						className="text-justify font-thin"
					>
						{paragraph}
					</p>
				))}
			</div>
		</div>
	);
}

export default LegalInfo;
