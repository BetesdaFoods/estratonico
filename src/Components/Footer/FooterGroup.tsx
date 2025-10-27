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
		<div className="text-nowrap mx-2 mt-8 lg:mt-0 border-t lg:border-t-0 pt-6 lg:pt-0">
			<h3 className="text-[1.75rem] lg:text-2xl xl:text-3xl text-white  mx-4 lg:mx-0">
				{titleFinal}
			</h3>
			<ul role="list" className="mt-2 space-y-2">
				{links.map((item) => (
					<li key={idioma === "es" ? item.name : item.nameEN}>
						<div className="flex items-center py-[1px] lg:py-2 md:py-1 mx-4 lg:mx-0">
							{item.logo && (
								<Image
									src={item.logo}
									alt={idioma === "es" ? item.name : item.nameEN}
									width={28}
									height={28}
									className="mr-2"
								/>
							)}
							<a
								target={item.href.startsWith('http') ? '_blank' : undefined}
								rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
								href={item.href}
								className="font-medium text-[1.3rem] lg:text-xl xl:text-2xl text-gray-400/80 hover:text-white"
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
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default FooterGroup;
