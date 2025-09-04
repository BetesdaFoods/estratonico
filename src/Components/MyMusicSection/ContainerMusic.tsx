import Image from "next/image";

import Previous from "../ui/Previous";
import PlayButton from "../ui/PlayButton";

export default function ContainerMusic({ image }: { image: string }) {
	return (
		<div className="flex flex-col py-7">
			<div className="p-6 gap-6 mt-6 w-[27rem] h-48 bg-gradient-to-r from-[#696868] to-[#494949] rounded-3xl flex">
				<Image
					src={image}
					alt="Estratonicos"
					width={140}
					height={175}
					className="rounded-lg"
				/>

				<div className="pt-3 w-full">
					<h5 className="text-white text-lg font-bold">
						Titulo de la cancion
					</h5>
					<h6 className="text-white font-semibold">Estratonico</h6>
					<div className="border-t border-white w-full mt-2"></div>
					<div className="flex gap-2 justify-center items-center mt-3">
						<Previous />
						<PlayButton />
						<Previous inverted />
					</div>
				</div>
			</div>

			<h3 className=" font-orbitron ml-7 mt-4 text-xl font-semibold shadow-sm text-white  underline underline-offset-8 ">
				ESCUCHAR AHORA
			</h3>
		</div>
	);
}
