import Image from "next/image";
import Button from "../ui/Button";

function Cover() {
	return (
		<section className="w-screen  flex flex-col  relative isolate z-0">
			<div className="relative mt-[120px] flex justify-center items-center">
				<div className="hidden sm:block w-[95%] rounded-[40px] overflow-hidden sm:h-[calc(70vh+40px)] md:h-[calc(75vh+50px)] lg:h-[calc(80vh+50px)]">
					<img
						id="banner-img"
						className="w-full h-full object-cover shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)]"
						src="/assets/about_page.svg"
						alt="Hero background"
						style={{borderRadius: '40px'}}
					/>
				</div>
				<div className="w-[92%] absolute top-[4%] right-[4%] bottom-[4%] flex-col text-right">
					<div className="font-orbitron font-black text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
						<h1 className="leading-tight text-[28px] sm:text-[64px] lg:text-[64px]">
						Soy una sombra entre notas,{" "}
							<br className="hidden md:block" />
						un eco en la oscuridad.
						</h1>
					</div>
					<div
						className="font-medium flex flex-col  text-right
						pt-6 pb-10
						md:pt-8 md:pb-16
						text-lg gap-6 sm:gap-0
						sm:text-xl
						md:text-2xl
						lg:text-3xl
						xl:text-[2rem]" // It's like text-3.5xl
					>
						<p>Mi música no busca respuestas, sino preguntas.</p>
						<p>
							Aquí, el misterio es la melodía, y la melodía es tu
							guía.
						</p>
					</div>
					<Button
						href="#mi_historia"
						className="uppercase w-fit font-orbitron font-black absolute bottom-0 right-0
							px-12 py-4
							text-xl
							sm:px-16 sm:py-5
							md:px-24 md:py-6
							md:text-2xl"
					>
						Conóceme
					</Button>
				</div>
			</div>
		</section>
	);
}

export default Cover;
