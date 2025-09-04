"use client";
import Button from "@/Components/ui/Button";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";

function Page() {
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("loading");

		try {
			const formData = new FormData(e.currentTarget);

			if (!formData.get("name")) {
				setStatus("error");
				setMessage("Nombre es requerido");
				return;
			}

			if (!formData.get("email")) {
				setStatus("error");
				setMessage("Email es requerido");
				return;
			}

			if (!formData.get("phone")) {
				setStatus("error");
				setMessage("Teléfono es requerido");
				return;
			}

			if (!formData.get("message")) {
				setStatus("error");
				setMessage("Mensaje es requerido");
				return;
			}

			await axios.post("/api/contact", formData);
			setStatus("success");
			setMessage("¡Mensaje enviado!");
		} catch (error) {
			console.error("Error subscribing:", (error as Error).message);
			setStatus("error");
			setMessage("Error con la solicitud");
		}
	};

	return (
		<main className="w-screen h-fit pt-20 flex flex-col md:flex-row items-stretch gap-8 relative bg-grayBackground">
			<Image
				fill
				src="/assets/blurred-shiny-light-background.png"
				alt="Background"
				className="absolute top-0 left-0 w-full h-full object-cover hidden xl:block"
			/>
			<div className="w-full md:w-1/2 relative">
				<Image
					className="object-cover w-full h-full rounded-br-[12rem]"
					src="/assets/estratonico-contact.png"
					alt="Contacto Estratonico"
					width={1002}
					height={812}
				/>
			</div>
			<div className="w-full md:w-1/2 pt-12 flex flex-col justify-center px-6 md:px-6 lg:px-12 2xl:px-32 flex-1 z-[8]">
				<h1 className="text-3xl md:text-4xl font-light">
					¿Tienes algo que decir? <br className="hidden xl:block" />
					<span className="font-bold">
						Estoy aquí, escuchando entre las sombras
					</span>
				</h1>
				<form
					className="flex flex-col space-y-2 mt-8 bg-transparent text-white pr-0 md:pr-4 lg:pr-10 2xl:pr-20 w-full"
					onSubmit={handleSubmit}
				>
					<input
						required
						type="text"
						name="name"
						placeholder="nombre"
						className="p-4 font-light border-b border-b-gray-300 rounded-none bg-transparent text-white text-xl md:text-2xl focus:outline-none w-full"
					/>
					<input
						required
						type="email"
						name="email"
						placeholder="email"
						className="p-4 font-light border-b border-b-gray-300 rounded-none bg-transparent text-white text-xl md:text-2xl focus:outline-none w-full"
					/>
					<input
						required
						type="phone"
						name="phone"
						placeholder="teléfono"
						className="p-4 font-light bg-transparent text-white text-xl md:text-2xl focus:outline-none w-full"
					/>
					<textarea
						required
						name="message"
						placeholder="Escribe tu mensaje aquí"
						className="p-4 font-light border border-gray-300 rounded-2xl h-52 bg-transparent text-white text-xl md:text-2xl focus:outline-none w-full"
					/>
					<div className="flex justify-start md:justify-start lg:justify-start">
						<Button
							className={`uppercase !mt-6 !mb-12 font-orbitron font-black py-4 md:py-6 px-10 md:px-20 w-fit text-lg md:text-xl
								${
									status === "loading"
										? "hover:cursor-wait"
										: status === "success"
										? "hover:cursor-not-allowed"
										: ""
								}`}
							submit
							disabled={
								status === "loading" || status === "success"
							}
						>
							{status === "loading"
								? "Enviando..."
								: status === "success"
								? "¡Listo!"
								: "Enviar"}
						</Button>
						{status === "error" && (
							<p className="text-red-500 mt-10 md:mt-12 ml-4 lg:ml-6 xl:ml-8">
								{message}
							</p>
						)}
						{status === "success" && (
							<p className="text-green-500 mt-10 md:mt-12 ml-4 lg:ml-6 xl:ml-8">
								{message}
							</p>
						)}
					</div>
				</form>
			</div>
		</main>
	);
}

export default Page;
