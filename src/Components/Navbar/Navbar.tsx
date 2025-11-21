"use client";

import Link from "next/link";
import { Popover, PopoverButton, PopoverGroup } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Estratonico from "@/Components/Navbar/Estratonico";
import { LogoDisplayerSVG } from "@/Components/SVGLogo/LogoDisplayerSV";
import NavigationPanel from "./NavigationPanel";
import UpdateLanguagePanel from "./UpdateLanguagePanel";
import NavLinkDecorator from "./NavLinkDecorator";
import NavigationPanelMobile from "./NavigationPanelMobile";

interface NavbarProps {
	navigation: Record<string, { name: string; href: string }>;
	socials: Array<{ name: string; href: string; logo: string }>;
	musicPlatforms: Array<{ name: string; href: string; logo: string }>;
	idioma: Array<{ name: string; href: string; logo: string }>;
	setIdioma: (newIdioma: string) => void;
	idiomaSelected: string;
}

const Navbar = ({ navigation, socials, musicPlatforms, idioma, setIdioma, idiomaSelected }: NavbarProps) => {
	return (
		<Popover as="nav" className="fixed top-0 left-0 w-full  z-10">
			{({ open }) => (
				<>
					<div className="flex  justify-center items-center uppercase font-[orbitron] min-h-[104px]  z-30">
						{/* NAVBAR SVG */}
						<div className="absolute top-0 left-0 w-full min-h-[104px] -z-10 overflow-hidden">
							<div className="relative w-full h-full flex items-center justify-center">
								<Image
									className="h-6 object-cover absolute top-[60px] hidden xl:block"
									width={740}
									height={23}
									src="/assets/estratonicos-navbar-border.png"
									alt="navbar background"
								/>
								<Image
									className="h-6 object-cover absolute top-[65px] hidden lg:block xl:hidden"
									width={740}
									height={23}
									src="/assets/estratonicos-navbar-border.png"
									alt="navbar background"
								/>
								{/* <Image
									className="object-cover absolute top-[78px] md:hidden"
									width={245}
									height={23}
									src="/assets/estratonicos-navbar-border-sm.png"
									alt="navbar background"
								/> */}
								<Image
									className="w-full min-h-[80px] absolute top-0 left-0 hidden xl:block"
									width={1920}
									height={104}
									src="/assets/estratonicos-navbar.png"
									alt="navbar background"
								/>
								<Image
									className="w-full min-h-[50px] object-cover absolute top-0 left-0 xl:hidden"
									width={1920}
									height={104}
									src="/assets/estratonicos-navbar-md.png"
									alt="navbar background"
								/>
								<Image
									className="w-full min-h-[104px] object-cover absolute top-0 left-0 lg:hidden"
									width={1920}
									height={104}
									src="/assets/estratonicos-navbar-md.png"
									alt="navbar background"
								/>
							</div>
						</div>

						<div className="flex items-center justify-center relative w-full">
							{/* LOGO */}
							<div className="flex lg:flex-none sm:flex-none md:justify-start justify-center w-full absolute lg:left-4 transform -translate-y-2 px-4 lg:px-12 transition-all duration-300  ">
								<Link
									href={navigation.home.href}
									className="block"
								>
									<div className="sm:block lg:block w-52  transition-all duration-300">
										<Estratonico className="2xl:w-[12rem] xl:w-[15rem] lg:w-[10rem] w-[13rem] 2xl:mb-4" />
									</div>
								</Link>
							</div>

							{/* LINKS */}
							<ul className="hidden md:flex origin-center gap-6 lg:gap-[40px] xl:gap-[86px] text-center font-semibold pb-8">
								{Object.values(navigation).map((item) => (
									<li
										key={item.name}
										className="block max-w-[155px] nav-hover text-white text-[16px] lg:text-[18px] xl:text-[16px]"
									>
										<Link
											href={item.href}
											className="relative whitespace-nowrap inline-block group"
										>
											{item.name}
											<NavLinkDecorator className="transform transition-transform duration-300 ease-in-out scale-x-0 group-hover:scale-x-100" />
										</Link>
									</li>
								))}
							</ul>

							<PopoverGroup
								as="div"
								className="sm:pb-5 pb-3 absolute right-3 sm:right-4 lg:right-14"
							>
								{/* WEB Y TABLET */}
								<div className="flex items-center justify-between gap-2 sm:gap-2 hidden md:flex">
									{/* LANGUAGE SELECTION */}
									<Popover className="flex items-center">
										{() => (
											<>
												<PopoverButton
													className="focus:outline-none">
													<LogoDisplayerSVG
														isLanguage={true}
														isOpen={true}
														idiomaSelected={idiomaSelected}
														isInstagram={false}
													/>
												</PopoverButton>
												<UpdateLanguagePanel
													links={idioma}
													setIdioma={setIdioma}
													idiomaSelected={idiomaSelected}
												/>
											</>
										)}
									</Popover>
									{/* SOCIAL MEDIA */}
									<Popover className="flex items-center">
										{() => (
											<>
												<PopoverButton
													className="focus:outline-none">
													<LogoDisplayerSVG
														isLanguage={true}
														isOpen={true}
														idiomaSelected={idiomaSelected}
														isInstagram={false}
													/>
												</PopoverButton>
												{/* SOCIAL MEDIA NAV MENU */}
												<NavigationPanel
													links={socials}
													socials={true}
												/>
											</>
										)}
									</Popover>
									{/* SOCIAL MEDIA */}
									<Popover className="flex items-center">
										{() => (
											<>
												<PopoverButton className="focus:outline-none">
													<LogoDisplayerSVG
														isOpen={true}
													/>
												</PopoverButton>
												{/* SOCIAL MEDIA NAV MENU */}
												<NavigationPanel
													links={musicPlatforms}
													socials={false}
												/>
											</>
										)}
									</Popover>
								</div>
								{/* MOBILE */}
								<div className="flex items-center justify-between gap-2 sm:gap-2 md:hidden">
									{/* GLOBAL */}
									<Popover className="flex items-center">
										{() => (
											<>
												<PopoverButton className="focus:outline-none">
													<LogoDisplayerSVG
														isGlobal={true}
														isOpen={true}
													/>
												</PopoverButton>
												<NavigationPanelMobile
													linksMusic={musicPlatforms}
													linksSocials={socials}
													
												/>
											</>
										)}
									</Popover>
								</div>
							</PopoverGroup>

							{/* HAMBURGER */}
							<div className="absolute left-4 md:hidden">
								<PopoverButton className="inline-flex items-center justify-center rounded-md text-white hover:text-white hover:bg-black/10 focus:outline-none">
									{open ? (
										<XMarkIcon
											className="block h-6 w-6"
											aria-hidden="true"
										/>
									) : (
										<svg
											width="35"
											height="35"
											viewBox="0 0 22 15"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M0.966797 0.850586H14.1528L16.5947 3.85059H21.9668"
												stroke="white"
											/>
											<path
												d="M0.966797 5.85059H14.1528L16.5947 8.85059H21.9668"
												stroke="white"
											/>
											<path
												d="M0.966797 10.8506H14.1528L16.5947 13.8506H21.9668"
												stroke="white"
											/>
										</svg>
									)}
									<span className="sr-only">
										Open main menu
									</span>
								</PopoverButton>
							</div>
						</div>
					</div>

					{/* MOBILE NAV MENU */}
					<NavigationPanel links={Object.values(navigation)} />
				</>
			)}
		</Popover>
	);
};

export default Navbar;
