import React from "react";
import ContainerMusic from "./ContainerMusic";

import Link from "next/link";

export default function MusicBoxes() {
	return (
		<section className="flex flex-col  items-center  ">
			<div className="lg:flex  justify-center gap-96  items-center">
				<h4 className="font-bold text-5xl mb-12 lg:mb-0  text-center text-white ">
					MI NUEVA <span className="text-[#62D0FF]"> MUSICA </span>{" "}
				</h4>
				<Link
					href="/contacto"
					className="uppercase border-8 hidden lg:inline-block border-white  notched-shape  py-6 px-12 font-orbitron 
              relative overflow-hidden text-xl font-bold
             hover:bg-white hover:text-black transition-colors duration-300
             text-white"
				>
					contáctame yaa
				</Link>
			</div>
			<div className="lg:flex lg:gap-60 ">
				<ContainerMusic image={"/assets/estratonicos-5.png"} />
				<ContainerMusic image={"/assets/estratonicos-6.png"} />
			</div>
		</section>
	);
}
