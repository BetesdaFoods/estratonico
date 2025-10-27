"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { useLanguage } from '@/Components/Context/LanguageContext';
import HeaderMusic from "../ContactSection/HeaderMusic";

export default function Hero() {
	const [videoSupported, setVideoSupported] = useState(false);
	const { idioma } = useLanguage();

	useEffect(() => {
		const v = document.createElement("video");
		// detect mp4 support
		setVideoSupported(!!v.canPlayType && v.canPlayType("video/mp4") !== "");
	}, []);

	return (
		<section className="w-screen  flex flex-col  relative isolate z-0">
			<div className="relative mt-[120px] flex justify-center items-center">
				{videoSupported ? (
					<>
						<div className="hidden sm:block w-[95%] rounded-[40px] overflow-hidden sm:h-[calc(70vh+40px)] md:h-[calc(75vh+50px)] lg:h-[calc(80vh+50px)]">
							<video
								autoPlay
								muted
								loop
								playsInline
								preload="metadata"
								poster="/assets/estratonicos-home.png"
								className="w-full h-full object-cover shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)]"
								style={{ filter: 'brightness(0.7)' }}
							>
								<source
									src="/assets/estratonicos-home-loop.mp4"
									type="video/mp4"
								/>
								{/* fallback text */}
								{idioma === 'es' ? 'Tu navegador no soporta video en background.' : 'Your browser does not support background video.'}
							</video>
						</div>
						<div className="sm:hidden w-[95%] rounded-[16px] overflow-hidden aspect-[4/5] shadow-[0_0_30px_-10px_rgba(0,0,0,0.6)]">
							<video
								autoPlay
								muted
								loop
								playsInline
								preload="metadata"
								poster="/assets/estratonicos-home.png"
								className="w-full h-full object-cover"
								style={{ filter: 'brightness(0.7)' }}
							>
								<source
									src="/assets/estratonicos-home-loop.mp4"
									type="video/mp4"
								/>
								{/* fallback text */}
								{idioma === 'es' ? 'Tu navegador no soporta video en background.' : 'Your browser does not support background video.'}
							</video>
						</div>
					</>
				) : (
					<>
						<div className="hidden sm:block w-[95%] rounded-[40px] overflow-hidden sm:h-[calc(70vh+40px)] md:h-[calc(75vh+50px)] lg:h-[calc(80vh+50px)]">
							<img
								id="banner-img"
								className="w-full h-full object-cover shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)]"
								src="/assets/estratonicos-home.png"
								alt="Hero background"
								style={{borderRadius: '40px'}}
							/>
						</div>
						<div className="sm:hidden w-[95%] rounded-[16px] overflow-hidden aspect-[4/5] shadow-[0_0_30px_-10px_rgba(0,0,0,0.6)]">
							<img
								id="banner-img"
								className="w-full h-full object-cover"
								src="/assets/estratonicos-home.png"
								alt="Hero background"
								style={{borderRadius: '16px'}}
							/>
						</div>
					</>
				)}

				<div className="w-[92%] absolute top-[4%] left-[4%] flex-col text-left">
					<div className="font-orbitron font-black text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
						<h1 className="leading-tight text-[28px] sm:text-[64px] lg:text-[64px]">
							{idioma === 'es' ? 'Desentrañando el' : 'Unraveling the'}
							<br />
							{idioma === 'es' ? 'alma a través' : 'soul through'}
							<br />
							{idioma === 'es' ? 'del sonido.' : 'my sound.'}
						</h1>
					</div>

					<p className="text-[0.82rem] sm:text-2xl leading-tight lg:text-[28px] mt-1 sm:mt-16 lg:mt-5 text-white font-roboto drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
						{idioma === 'es' ? 'Creo experiencias inolvidables a' : 'I create unforgettable experiences'}
						<br />
						{idioma === 'es' ? 'través de mi música.' : 'through my music.'}
					</p>
				</div>

				{/* Call to Action */}
				<div className="w-full flex right-[5%] bottom-[8%] justify-end absolute">
					<div className="text-right">
						<p className="uppercase text-[0.82rem] lg:pl-32 sm:text-lg lg:text-[20px] mb-4 text-white font-roboto">
							{idioma === 'es' ? '¿trabajamos ': 'LET\'S WORK '}<span className="font-black">{idioma === 'es' ? 'juntos' : 'together'}</span>?
						</p>
						<Button
							href="/contacto"
							className="uppercase py-4 px-6 lg:px-12 sm:py-5 font-orbitron sm:text-[20px] font-black"
						>
							{idioma === 'es' ? 'Contáctame ya' : 'Contact me now'}
						</Button>
					</div>

				</div>
			</div>
			<div className="relative z-10 w-full flex items-center justify-center overflow-hidden min-h-[50px] pt-16 pb-12 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 xl:pt-52 xl:pb-24"
				style={{marginTop: '2%'}}
			>
				<img
					src="/assets/Frame_626.svg"
					alt="circle left"
					className="absolute opacity-80 pointer-events-none select-none left-[4%] lg:left-[6%] xl:left-[10%] top-0 md:w-[160px] lg:w-[200px] xl:w-[320px] w-[60px]"
					style={{color: 'transparent'}}
				/>
				<img
					src="/assets/Frame_627.svg"
					alt="circle right"
					className="absolute opacity-100 pointer-events-none select-none right-[4%] lg:right-[6%] xl:right-[10%] bottom-0 md:w-[160px] lg:w-[200px] xl:w-[320px] w-[60px]"
					style={{color: 'transparent'}}
				/>
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
					<span className="w-full flex items-center justify-center">
						<HeaderMusic />
					</span>
				</div>
			</div>
		</section>
	);
}
