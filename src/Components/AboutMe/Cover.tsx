"use client";
import { useLanguage } from "../Context/LanguageContext";
import ButtonOval from "../ui/ButtonOval";

function Cover() {
	const {idioma } = useLanguage();
	return (
		<section className="w-screen flex flex-col items-center relative isolate z-0 px-8">
			<div className="relative mt-[120px] w-full lg:w-[92%] flex ">
				<div className="hidden sm:block w-full rounded-[40px] overflow-hidden h-[calc(70vh+40px)] lg:h-[calc(60vh+50px)] xl:h-[calc(80vh+50px)]">
					<img
						id="banner-img"
						className="w-full h-full object-cover shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)]"
						src="/assets/about_page/about_page.svg"
						alt="Hero background"
						style={{borderRadius: '40px'}}
					/>
				</div>
				<div className="sm:hidden w-full rounded-[10px] overflow-hidden shadow-[0_0_30px_-10px_rgba(0,0,0,0.6)]">
					<img
						id="banner-img"
						className="w-full h-auto object-cover"
						src="/assets/about_page/about_page_phone.svg"
						alt="Hero background"
						style={{borderRadius: '10px'}}
					/>
				</div>
				<div className="w-full absolute top-[8%] right-[3%] bottom-[4%] flex-col text-right">
					<div className="font-orbitron font-black text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
						<h1 className="leading-[25px] lg:leading-[50px] xl:leading-[55px] text-[24px] lg:text-[45px] xl:text-[49px] lg:tracking-wide">
							{idioma === 'es' ? "Soy una sombra entre" : "I´m a shadow among"}<br />
							{idioma === 'es' ? "notas, un eco en" : "notes, an echo in"}<br />
							{idioma === 'es' ? "la oscuridad" : "the darkness"}
						</h1>
					</div>
					<div
						className="font-medium flex flex-col  text-right
						pt-2 lg:pt-8 pb-10
						md:pt-8 md:pb-16
						text-[10px]
						lg:text-[20px]
						xl:text-[20px]"
					>

						<p>{idioma === 'es' ? "Mi música no busca respuestas, sino preguntas." : "My music doesn't seek answers, but questions."}</p>
						<p>
							{idioma === 'es' ? "Aquí, el misterio es la melodía, y la melodía es tu guía." : "Here, the mystery is the melody, and the melody is your guide."}
						</p>
					</div>
					<ButtonOval
						href="#mi_historia"
						className="absolute flex uppercase w-[51%] lg:w-[29%] xl:w-[25%] font-orbitron font-black absolute bottom-0 right-0 justify-center text-center
							px-0 py-3
							text-[12px]
							lg:px-0 lg:py-4
							lg:text-[20px]
							xl:px-0 xl:py-6
							xl:text-[17px]
							mb-5"
					>
						{idioma === 'es' ? "Conóceme" : "Know me"}
					</ButtonOval>
				</div>
			</div>
		</section>
	);
}

export default Cover;
