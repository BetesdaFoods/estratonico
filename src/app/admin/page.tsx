import React from "react";
import Link from "next/link";

export const metadata = {
	title: "Dashboard",
	description: "Dashboard del admin",
};

const links = [
	{ name: "Usuarios", href: "/admin/usuarios" },
	{ name: "Noticias", href: "/admin/noticias" },
	{ name: "Musica", href: "/admin/musica" },
];

function page() {
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div
				className="bg-gradient-to-b from-neutral-950/90 to-neutral-800/70
			 				h-fit w-6/12 rounded-2xl text-4xl 
							py-8 px-8 
							flex justify-evenly items-center"
			>
				{links.map((item) => (
					<Link
						href={item.href}
						key={item.name}
						className="text-white/80 hover:text-white"
					>
						{item.name}
					</Link>
				))}
			</div>
		</div>
	);
}

export default page;
