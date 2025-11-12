import { CloseButton, PopoverPanel, Transition } from "@headlessui/react";
import Image from "next/image";

interface UpdateLanguagePanelProps {
	links: { name: string; logo?: string; href: string }[];
	setIdioma: (newIdioma: string) => void;
	idiomaSelected: string;
}

function UpdateLanguagePanel({ links, setIdioma, idiomaSelected }: UpdateLanguagePanelProps) {
	return (
		<Transition
			enter="transition duration-100 ease-out"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition duration-75 ease-out"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0"
		>
			<PopoverPanel
				anchor="bottom end"
				className="bg-gradient-to-b from-neutral-950/90 to-neutral-800/90 md:to-neutral-800/75 z-20 w-full md:w-fit md:rounded-md [--anchor-gap:20px] sm:[--anchor-gap:17px] md:[--anchor-gap:25px] md:py-4 md:text-xl"
			>
				<div className="py-2 space-y-1">
					{links.map((item) => (
						<CloseButton
							as="a"
							target={item.href.startsWith('http') ? '_blank' : undefined}
							rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
							href={item.href}
							key={item.name}
							onClick={(e) => {
								const isExternal = item.href.startsWith('http');
								if (!isExternal) {
									e.preventDefault();
									const code = item.href || (item.name.toLowerCase().startsWith('eng') ? 'en' : 'es');
									setIdioma(code);
								}
							}}
							className="flex w-full gap-3 items-center rounded-md pl-4 pr-24 py-1 font-roboto font-medium text-white opacity-70 hover:opacity-100 duration-200 hover:underline"
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

export default UpdateLanguagePanel;
