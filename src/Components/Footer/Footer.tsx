import Estratonico from "../Navbar/Estratonico";
import FooterGroup from "./FooterGroup";

export default function Footer({
	navigation,
}: {
	navigation: Record<string, { name: string; href: string; logo: string }[]>;
}) {
	return (
		<footer className="bg-black w-full px-32 sm:px-4 md:px-4 lg:px-16 xl:px-32 pt-12 lg:pt-28 pb-20 lg:pb-32">
			<div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between lg:gap-10 xl:gap-16">
				<div className="flex justify-center">
					<Estratonico className="w-[14rem] lg:w-[20rem]" />
				</div>

				<div className="flex flex-col items-start md:flex-row md:w-full md:items-start md:justify-evenly xl:w-4/6">
					{Object.entries(navigation).map(([title, links]) => (
						<FooterGroup key={title} title={title} links={links} />
					))}
				</div>
			</div>
		</footer>
	);
}
