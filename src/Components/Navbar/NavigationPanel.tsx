import { CloseButton, PopoverPanel, Transition } from "@headlessui/react";
import Image from "next/image";

interface NavigationPanelProps {
	links: { name: string; logo?: string; href: string }[]; socials?: boolean;
}

function NavigationPanel({ links, socials }: NavigationPanelProps) {
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
				className="bg-gradient-to-b from-neutral-950/90 to-neutral-800/90 md:to-neutral-800/75 z-20 w-full md:w-auto md:rounded-3xl [--anchor-gap:20px] sm:[--anchor-gap:17px] md:[--anchor-gap:25px] md:py-4 md:text-xl"
			>
				{socials && (
					<div className="py-2 space-y-1">
						{links.map((item) => (
							<CloseButton
								as="a"
								target={item.href.startsWith('http') ? '_blank' : undefined}
								rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
								href={item.href}
								key={item.name}
								className="flex w-full gap-2 items-center rounded-md pl-6 pr-16 py-1 font-roboto font-medium text-white contrast-0 opacity-100 duration-200 hover:underline hover:contrast-100"
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
				)}
				{!socials && (
					<div className="py-2 space-y-1">
						{links.map((item) => (
							<CloseButton
								as="a"
								target={item.href.startsWith('http') ? '_blank' : undefined}
								rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
								href={item.href}
								key={item.name}
								className="flex w-full gap-2 items-center rounded-md pl-6 pr-4 py-1 font-roboto font-medium text-white contrast-0 opacity-100 duration-200 hover:underline hover:contrast-100"
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
				)}
			</PopoverPanel>
		</Transition>
	);
}

export default NavigationPanel;
