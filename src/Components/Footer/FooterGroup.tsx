"use client";
import Image from "next/image";
import { useLanguage } from "../Context/LanguageContext";

interface FooterGroupProps {
	title: string;
	links: { titleEN: string; name: string; nameEN: string; logo?: string; href: string }[];
}

function FooterGroup({ title, links }: FooterGroupProps) {
	const { idioma } = useLanguage();

	const titleFinal = idioma === "es" ? title : links[0]?.titleEN || title;
	return (
		<div className="text-nowrap lg:mx-2 mt-8 lg:mt-0 border-t lg:border-t-0 pt-6 lg:pt-0">
			<h3 className="text-[24px] lg:text-2xl xl:text-[23px] text-white font-[500] mx-4 lg:mx-0">
				{titleFinal}
			</h3>
			<ul role="list" className="mt-2 space-y-2">
				{links.map((item) => (
					<li key={idioma === "es" ? item.name : item.nameEN}>
						<div className="group flex items-center py-[1px] lg:py-1 md:py-1 mx-4 lg:mx-0 contrast-0 hover:contrast-100 hover:underline duration-500">
							{item.logo && (
								<Image
									src={item.logo}
									alt={idioma === "es" ? item.name : item.nameEN}
									width={25}
									height={25}
									className="mr-2"
								/>
							)}
							<a
								target={item.href.startsWith('http') ? '_blank' : undefined}
								rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
								href={item.href}
								className="hidden lg:block font-medium text-[18px] lg:text-xl xl:text-[20px] text-gray-400/80 group-hover:text-white"
							>
								{(idioma === "es" ? item.name : item.nameEN).split("\n").map((line, index) => (
									<span key={index}>
										{line}
										{index <
											(idioma === "es" ? item.name : item.nameEN).split("\n").length -
												1 && <br />}
									</span>
								))}
							</a>
							<a
								target={item.href.startsWith('http') ? '_blank' : undefined}
								rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
								href={item.href}
								className="lg:hidden font-medium text-[18px] lg:text-xl xl:text-[20px] text-gray-400/80 group-hover:text-white"
							>
								{(idioma === "es" ? item.name : item.nameEN).split("\n").map((line, index) => (
									<span key={index}>
										{line}
										{index <
											(idioma === "es" ? item.name : item.nameEN).split("\n").length -
												1 }
									</span>
								))}
							</a>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default FooterGroup;
