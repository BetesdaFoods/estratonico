"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function LegalNavbar({
	links,
}: Readonly<{ links: { name: string; href: string }[] }>) {
	const pathname = usePathname();
	return (
		<nav className="h-40 lg:h-48 w-full z-10 text-white bg-neutral-800 flex items-end justify-center">
			<div className="flex items-center gap-1 sm:gap-2 lg:gap-9 p-2 lg:p-6">
				{links.flatMap((link, index) => [
					<Link
						key={link.href}
						href={link.href}
						className={`text-white uppercase text-center md:text-lg lg:text-xl xl:text-2xl w-[110px] sm:w-[180px] md:w-[235px] lg:w-[300px] xl:w-[350px] ${
							pathname === link.href
								? "font-black"
								: "font-light hover:font-medium"
						}`}
					>
						{link.name}
					</Link>,
					index < links.length - 1 && (
						<svg
							key={`separator-${index}`}
							width="2"
							height="37"
							viewBox="0 0 2 37"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M1 0V37" stroke="white" />
						</svg>
					),
				])}
			</div>
		</nav>
	);
}

export default LegalNavbar;
