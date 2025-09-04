import Image from "next/image";
import Button from "../ui/Button";

function Cover() {
	return (
		<section className="w-screen min-h-screen relative flex flex-col justify-center items-center px-12">
			<Image
				id="banner-img"
				fill
				className="-z-10 top-0 left-0 absolute w-screen min-h-screen object-cover"
				src="/assets/estratonico-aboutme.png"
				alt="Hero background"
			/>
			<div className="w-full max-w-full flex flex-col md:items-center pt-12 xl:pt-32">
				<h1
					className="uppercase font-orbitron font-black md:text-center
					text-[2rem]/tight
					sm:text-4xl/tight
					lg:text-5xl/tight
					xl:text-6xl/tight
					2xl:text-[4rem]/tight" // It's like text-6.5xl
				>
					Soy una sombra entre notas,{" "}
					<br className="hidden md:block" />
					un eco en la oscuridad.
				</h1>
				<div
					className="font-medium flex flex-col md:items-center
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
					className="uppercase w-fit font-orbitron font-black
						px-12 py-4
						text-xl
						sm:px-16 sm:py-5
						md:px-24 md:py-6
						md:text-2xl"
				>
					Conóceme
				</Button>
			</div>
		</section>
	);
}

export default Cover;
