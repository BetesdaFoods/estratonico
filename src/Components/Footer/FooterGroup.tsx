import Image from "next/image";

interface FooterGroupProps {
	title: string;
	links: { name: string; logo?: string; href: string }[];
}

function FooterGroup({ title, links }: FooterGroupProps) {
	return (
		<div className="text-nowrap mx-2 mt-24 lg:mt-0">
			<h3 className="text-3xl md:text-2xl xl:text-3xl text-white">
				{title}
			</h3>
			<ul role="list" className="mt-2 space-y-2">
				{links.map((item) => (
					<li key={item.name}>
						<div className="flex items-center py-2 md:py-1">
							{item.logo && (
								<Image
									src={item.logo}
									alt={item.name}
									width={20}
									height={20}
									className="mr-2"
								/>
							)}
							<a
								target={item.href.startsWith('http') ? '_blank' : undefined}
								rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
								href={item.href}
								className="font-medium text-2xl md:text-xl xl:text-2xl text-gray-400/80 hover:text-white"
							>
								{item.name.split("\n").map((line, index) => (
									<span key={index}>
										{line}
										{index <
											item.name.split("\n").length -
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
