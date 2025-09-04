"use client";
import { useState } from "react";
import LineEllipsis from "../ui/LineEllipsis";

function MyStory() {
	const [showMore, setShowMore] = useState(false);

	return (
		<section id="mi_historia" className="w-screen bg-grayBackground py-20 xl:py-28 px-12 md:px-24 xl:px-32 2xl:px-36 xl:flex xl:gap-20">
			<div className="md:w-2/3 lg:w-1/2">
				<h1
					className="font-black uppercase 
				text-4xl
				sm:text-5xl
				md:text-6xl
				lg:text-[4.3rem]
				xl:text-[4.9rem]
				2xl:text-[7.5rem]"
				>
					Esta es <br />
					<span className="bg-gradient-to-r from-10% from-[#b41619] to-[#ff5558] text-transparent bg-clip-text">
						mi historia
					</span>
				</h1>

				<LineEllipsis className="flex items-center flex-grow" sm />
			</div>

			<div
				className="pt-8 pr-8
				md:pt-12 md:pr-0
				font-thin
				sm:flex sm:flex-col sm:gap-6
				md:flex-row md:gap-12 md:text-justify
				xl:flex-col xl:gap-6 xl:w-1/2 xl:pt-0
				lg:text-lg
				xl:text-xl
				2xl:text-2xl"
			>
				{/* Paragraphs 1 & 2 */}
				<div className="flex flex-col sm:gap-6 md:w-1/2 xl:w-full">
					{/* Highlighted first paragraph */}
					<p className="font-black">
						Soy un artista con una profunda pasión por la música.
						Mis influencias musicales derivan de las emociones
						provenientes de diferentes movimientos, donde las
						melodías y las letras van de la mano con una
						incontrolable manifestación del pensamiento y las
						emociones.
					</p>

					{/* Show more with button */}
					<div className="relative sm:hidden">
						<p
							className={`mt-6
							${
								!showMore &&
								"bg-gradient-to-b from-white to-neutral-600 text-transparent bg-clip-text"
							}`}
						>
							Mi sensibilidad musical es muy amplia, crecí
							escuchando diferentes géneros, y asi descubrí
							estilos maravillosos de expresión del mismo arte.
						</p>

						{/* Either show the button or more text */}
						{!showMore ? (
							<button
								onClick={() => setShowMore(true)}
								className="w-full flex justify-center absolute bottom-2"
							>
								<svg
									width="54"
									height="31"
									viewBox="0 0 54 31"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M3 3L27 26L51 3"
										stroke="white"
										strokeWidth="6"
										strokeLinecap="round"
									/>
								</svg>
							</button>
						) : (
							<>
								<p className="mt-6">
									Siento como nuestras moléculas vibran de
									forma particular con cada onda de sonido que
									esta produce, me inspira la reacción
									singular que se genera en todos nuestros
									seres.
								</p>
								<p className="mt-6">
									Espero poder acompañarte y generar en ti la
									misma alegría que me produce la creación de
									mi contenido, siempre en mi mente poder
									compartirla contigo.
								</p>
							</>
						)}
					</div>

					{/* The rest of the paragraphs always shown on bigger screens */}
					<p className="hidden sm:block">
						Mi sensibilidad musical es muy amplia, crecí escuchando
						diferentes géneros, y asi descubrí estilos maravillosos
						de expresión del mismo arte.
					</p>
				</div>

				{/* Paragraphs 3 & 4 */}
				<div className="flex flex-col sm:gap-6 md:w-1/2 xl:w-full">
					<p className="hidden sm:block">
						Siento como nuestras moléculas vibran de forma
						particular con cada onda de sonido que esta produce, me
						inspira la reacción singular que se genera en todos
						nuestros seres.
					</p>
					<p className="hidden sm:block">
						Espero poder acompañarte y generar en ti la misma
						alegría que me produce la creación de mi contenido,
						siempre en mi mente poder compartirla contigo.
					</p>
				</div>
			</div>
		</section>
	);
}

export default MyStory;
