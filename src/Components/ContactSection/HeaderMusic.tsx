import VectorLines from "../ui/VectorLines";

export default function HeaderMusic() {
	return (
		<div className="w-full pt-12 md:pt-16 lg:pt-24 px-5 md:px-8 flex flex-col items-center">
			<VectorLines />
			<div className="py-12 sm:py-5 md:py-6 lg:py-7 px-4 sm:px-16 md:px-20 lg:px-28">
				<h4 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-[3.1rem] font-orbitron text-white">
					ENTRE LUCES Y SOMBRAS,
					<br />
					<span className="lg:hidden font-black">
						NACE MI MÚSICA.
					</span>
					<span className="hidden lg:block font-black">
						NACE MI MÚSICA.
					</span>
				</h4>
			</div>
			<VectorLines flip />
		</div>
	);
}
