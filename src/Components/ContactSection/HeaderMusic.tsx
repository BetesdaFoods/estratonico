"use client";
import VectorLines from "../ui/VectorLines";
import { useLanguage } from "../Context/LanguageContext";
import { use } from "react";

export default function HeaderMusic({className}: {className?: string}) {
	const { idioma } = useLanguage();

	return (
		<div className="w-[100%] px-4 md:px-8 flex flex-col items-center">

			<VectorLines className={className} />
			<div className="py-2 sm:py-5 lg:py-4 xl:py-5 px-0 sm:px-16 md:px-20 lg:px-30">
				<h4 className="text-center text-[16px] sm:text-3xl md:text-2xl lg:text-[2rem] xl:text-[2.2rem] lg:leading-[2.2rem] xl:leading-[3rem] font-orbitron text-white">
					{idioma === 'es' ? 'ENTRE LUCES Y SOMBRAS,' : 'BETWEEN LIGHTS AND SHADOWS,'}
					<br />
					<span className="lg:hidden font-black">
						{idioma === 'es' ? 'NACE MI MÚSICA.' : 'MY MUSIC IS BORN.'}
					</span>
					<span className="hidden lg:block font-black">
						{idioma === 'es' ? 'NACE MI MÚSICA.' : 'MY MUSIC IS BORN.'}
					</span>
				</h4>
			</div>
			<VectorLines flip className={className} />
		</div>
	);
}
