"use client";
import { CloseButton, PopoverPanel, Transition } from "@headlessui/react";
import Image from "next/image";
import { useLanguage } from "../Context/LanguageContext";

interface NavigationPanelMobileProps {
	linksMusic: { name: string; logo?: string; href: string }[];
	linksSocials: { name: string; logo?: string; href: string }[];
}

function NavigationPanelMobile({ linksMusic, linksSocials }: NavigationPanelMobileProps) {
	const {idioma} = useLanguage();
	return (
		<Transition
            enter="transition duration-500 ease-in-out"
            enterFrom="transform translate-x-full opacity-100"
            enterTo="transform translate-x-0 opacity-100"
            leave="transition duration-500 ease-in-out"
            leaveFrom="transform translate-x-0 opacity-100"
            leaveTo="transform translate-x-full opacity-100"
		>
			<PopoverPanel
				anchor="bottom end"
				className="bg-gradient-to-b from-neutral-950/90 to-neutral-800/90 md:to-neutral-800/75 z-20 h-[80%] w-[80%] md:w-auto md:rounded-3xl [--anchor-gap:20px] sm:[--anchor-gap:17px] md:[--anchor-gap:25px] md:py-4 md:text-xl"
			>
					<div className="mx-8 border-t-2 border-white mt-10"></div>
					<h1 className="text-white font-roboto font-bold text-[22px] px-8 py-2 ">{idioma === "es" ? "Redes Sociales" : "Social Media"}</h1>
					<div className="mx-8 border-white border-b-2"></div>
					<div className="py-2 space-y-1 px-2">
						{linksSocials.map((item) => (
							<CloseButton
								as="a"
								target={item.href.startsWith('http') ? '_blank' : undefined}
								rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
								href={item.href}
								key={item.name}
								className="flex w-full gap-2 items-center rounded-md pl-6 pr-16 py-1 font-roboto font-medium text-[22px] text-white filter invert grayscale brightness-0"
							>
								{item.logo && (
									<Image
										src={item.logo}
										alt={item.name}
										width={25}
										height={25}
										className="w-[25px] h-[25px] md:w-[25px] md:h-[25px]"
									/>
								)}
								<span>{item.name}</span>
							</CloseButton>
						))}
					</div>
					<div className="mx-8 border-t-2 border-white mt-10"></div>
					<h1 className="text-white font-roboto font-bold text-[22px] px-8 py-2 ">{idioma === "es" ? "Plataformas" : "Platforms"}</h1>
					<div className="mx-8 border-white border-b-2"></div>
					<div className="py-2 space-y-1 px-2">
						{linksMusic.map((item) => (
							<CloseButton
								as="a"
								target={item.href.startsWith('http') ? '_blank' : undefined}
								rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
								href={item.href}
								key={item.name}
								className="flex w-full gap-2 items-center rounded-md pl-6 pr-4 py-1 font-roboto font-medium text-[22px] text-white filter invert grayscale brightness-0"
							>
								{item.logo && (
									<Image
										src={item.logo}
										alt={item.name}
										width={25}
										height={25}
										className="w-[25px] h-[25px] md:w-[25px] md:h-[25px]"
									/>
								)}
								<span>{item.name}</span>
							</CloseButton>
						))}
					</div>
			</PopoverPanel>
		</Transition>
	);
}

export default NavigationPanelMobile;
