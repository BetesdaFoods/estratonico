"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../ui/Button";

export default function Hero() {
	const [videoSupported, setVideoSupported] = useState(false);

	useEffect(() => {
		const v = document.createElement("video");
		// detect mp4 support
		setVideoSupported(!!v.canPlayType && v.canPlayType("video/mp4") !== "");
	}, []);

	return (
		<section className="w-screen min-h-screen flex flex-col justify-between relative">
			{videoSupported ? (
				<video
					id="banner-video"
					autoPlay
					muted
					loop
					playsInline
					poster="/assets/estratonicos-home.png"
					className="-z-10 top-0 left-0 absolute w-screen min-h-screen object-cover"
				>
					<source
						src="/assets/estratonicos-home-loop.mp4"
						type="video/mp4"
					/>
					{/* fallback text */}
					Tu navegador no soporta video en background.
				</video>
			) : (
				<Image
					id="banner-img"
					fill
					className="-z-10 top-0 left-0 absolute w-screen min-h-screen object-cover"
					src="/assets/estratonicos-home.png"
					alt="Hero background"
				/>
			)}

			<div className="pt-32 sm:pt-36 md:pt-40 lg:pl-16 xl:pl-32 lg:text-left text-center">
				<div className="font-orbitron font-black text-white uppercase drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
					<h1 className="hidden sm:block sm:leading-tight sm:text-5xl lg:text-[4rem]">
						Desentrañando el
						<br />
						alma a través
						<br />
						del sonido.
					</h1>
					<h1 className="sm:hidden text-[1.75rem]/tight">
						Desentrañando
						<br />
						el alma a través
						<br />
						del sonido.
					</h1>
				</div>

				<p className="text-xl sm:text-2xl leading-tight lg:text-[2rem] mt-8 sm:mt-16 lg:mt-8 text-white font-roboto drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
					Creo experiencias inolvidables a<br />
					través de mi música.
				</p>
			</div>

			{/* Call to Action */}
			<div className="w-full flex flex-col items-center lg:items-end pb-24 xl:pb-32 pr-8 sm:pr-16 xl:pr-28">
				<div className="text-right ml-4">
					<p className="uppercase  text-xl lg:pl-32 sm:text-lg lg:text-xl mb-4 text-center text-white font-roboto">
						¿trabajamos <span className="font-black">juntos</span>?
					</p>
					<Button
						href="/contacto"
						className="uppercase py-4 px-16 sm:py-6 font-orbitron 
                       sm:text-2xl font-black"
					>
						Contáctame ya
					</Button>
				</div>
			</div>
		</section>
	);
}
