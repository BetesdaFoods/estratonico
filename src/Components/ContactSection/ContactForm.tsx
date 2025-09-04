"use client";
import ContactBorder from "../ui/ContactBorder";
import Button from "../ui/Button";
import axios from "axios";
import { useState } from "react";

function ContactForm() {
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("loading");

		try {
			const formData = new FormData(e.currentTarget);
			const email = formData.get("email") as string;

			if (!email) {
				setStatus("error");
				setMessage("Email es requerido");
				return;
			}

			await axios.post("/api/subscribe", formData);
			setStatus("success");
			setMessage("¡Suscripción exitosa!");
		} catch (error) {
			console.error("Error subscribing:", (error as Error).message);
			setStatus("error");
			setMessage("Ocurrió un error al procesar tu solicitud");
		}
	};

	return (
		<div className="flex justify-center pt-16 pb-20">
			<div className="w-[20rem] h-[28rem] sm:w-[30rem] sm:h-[36rem] md:w-[44rem] lg:w-[52rem] xl:w-[72rem] 2xl:w-[110rem] md:h-[46rem] bg-contact bg-cover bg-center flex flex-col md:py-32 md:px-32 rounded-3xl relative">
				<ContactBorder
					className={
						"absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 hidden xl:block xl:w-[90%] xl:h-[100%] 2xl:w-[75%]"
					}
				/>
				<form
					className="py-16 px-8 md:px-16 lg:px-0 2xl:px-36 flex flex-col items-center justify-center gap-6"
					onSubmit={handleSubmit}
				>
					<h4 className="text-white font-orbitron text-center text-xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-[4rem] 2xl:leading-[4.8rem] md:mb-2">
						ÚNETE A LA
						<br />
						<span className="font-black">TRAVESÍA MUSICAL</span>
					</h4>
					<p className="text-white text-center mb-6 sm:text-xl md:text-2xl 2xl:text-3xl">
						Recibe las ultimas novedades directamente en tu inbox.
					</p>
					<div className="flex flex-col lg:flex-row md:items-center lg:justify-center lg:gap-6 lg:w-full lg:px-0">
						<input
							type="text"
							placeholder="Email de contacto"
							name="email"
							required
							className="uppercase text-sm sm:text-base md:text-lg lg:text-2xl notched-shape notched-shape-sm py-4 lg:py-6 px-3 sm:px-6 md:px-12 w-[15rem] sm:w-[18rem] md:w-[32rem] lg:w-[36rem] font-roboto font-light
										 overflow-hidden placeholder-white hover:cursor-text focus:bg-white focus:text-black focus:placeholder-black transition-colors duration-300"
						/>
						<Button
							variant="white"
							sm
							submit
							disabled={
								status === "loading" || status === "success"
							}
							className={`
								uppercase md:w-48 py-4 md:py-6 text-center font-roboto text-sm md:text-2xl mt-6 lg:mt-0 mx-12 lg:mx-0 lg:px-10
								${
									status === "loading"
										? "hover:cursor-wait"
										: status === "success"
										? "hover:cursor-not-allowed"
										: ""
								}`}
						>
							{status === "loading"
								? "Enviando..."
								: status === "success"
								? "¡Listo!"
								: "Enviar"}
						</Button>
					</div>
					{status === "error" && (
						<p className="text-red-500">{message}</p>
					)}
					{status === "success" && (
						<p className="text-green-500">{message}</p>
					)}
				</form>
			</div>
		</div>
	);
}

export default ContactForm;
