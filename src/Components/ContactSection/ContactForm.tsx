"use client";
import ContactBorder from "../ui/ContactBorder";
import Button from "../ui/Button";
import axios from "axios";
import { useState } from "react";
import { useLanguage } from "../Context/LanguageContext";

function ContactForm() {
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [message, setMessage] = useState("");
	const { idioma } = useLanguage();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("loading");

		try {
			const formData = new FormData(e.currentTarget);
			const email = formData.get("email") as string;

			if (!email) {
				setStatus("error");
				setMessage(idioma === 'es' ? "Email es requerido" : "Email is required");
				return;
			}

			await axios.post("/api/subscribe", formData);
			setStatus("success");
			setMessage(idioma === 'es' ? "¡Suscripción exitosa!" : "Subscription successful!");
		} catch (error) {
			console.error("Error subscribing:", (error as Error).message);
			setStatus("error");
			setMessage(idioma === 'es' ? "Ocurrió un error al procesar tu solicitud" : "An error occurred while processing your request");
		}
	};

	return (
		<div className="flex justify-center pb-20">
			<div className="w-[100vw] h-[28vh] lg:w-[88vw] xl:w-[110rem] lg:h-[65vh] bg-contact bg-cover bg-center flex flex-col md:py-32  rounded-3xl relative isolate z-0">
					<ContactBorder
						className={"absolute transform h-[700px] w-[90%] lg:w-[70%] xl:w-[75%] justify-center items-center top-1/2 -translate-y-1/2 pointer-events-none object-fill"}
					>
						<form
							className="absolute py-16 w-[85%] lg:w-[62%] xl:w-[65%] px-4 flex flex-col gap-3"
							onSubmit={handleSubmit}
						>
							<img
								src="/assets/contact/Frame_634.svg"
								alt="Contact Close"
								className="z-10 absolute top-[2.5rem] lg:top-14 xl:top-10 right-4 lg:right-2 xl:right-0 w-[10px] lg:w-[15px] xl:w-[20px] h-auto pointer-events-none select-none"
							/>
							<div className="flex flex-row lg:justify-center gap-2 lg:gap-6 lg:w-full lg:px-0">
								<div className="relative w-[10%] lg:w-[9%] xl:w-[12%] flex-shrink-0">
									<svg width="110" height="102" viewBox="0 0 110 102" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-[-3px] lg:bottom-[1.7rem] xl:bottom-10 left-0 w-[41px] lg:w-[64px] xl:w-[130px] h-auto">
										<path d="M100.834 25.5C100.834 20.825 96.7087 17 91.667 17H18.3337C13.292 17 9.16699 20.825 9.16699 25.5M100.834 25.5V76.5C100.834 81.175 96.7087 85 91.667 85H18.3337C13.292 85 9.16699 81.175 9.16699 76.5V25.5M100.834 25.5L55.0003 55.25L9.16699 25.5" stroke="#F3F3F3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
								</div>
								<div className="flex flex-col w-[85%] lg:w-full lg:px-0">
									<h4 className="text-white font-orbitron text-[1.2rem] lg:text-[1.8rem] xl:text-[2.5rem] font-bold">
										{idioma === 'es' ? 'Únete a la travesía musical' : 'Join the musical journey'}
									</h4>
									<p className="text-white mb-2 text-[0.8rem] lg:text-[1rem] xl:text-[1.3rem] xl:mt-2">
										{idioma === 'es' ? 'Recibe las últimas novedades directamente en tu inbox.' : 'Receive the latest updates directly in your inbox.'}
									</p>
									<div className="flex flex-row items-center lg:flex-col gap-2 lg:gap-0">
										<input
											type="text"
											placeholder={idioma === 'es' ? 'Email de contacto' : 'Contact email'}
											name="email"
											required
											className="uppercase text-[0.7rem] lg:text-[1rem] xl:text-2xl notched-shape notched-shape-sm py-2 lg:py-2 xl:py-6 px-3 lg:px-6 xl:px-12 flex-1 h-[80%] lg:h-auto w-full font-roboto font-light overflow-hidden placeholder-white hover:cursor-text focus:bg-white focus:text-black focus:placeholder-black transition-colors duration-300"
										/>
										<Button
											sm
											submit
											disabled={status === "loading" || status === "success"}
											className={`uppercase shrink-0 lg:mt-2 xl:mt-4 w-24 lg:w-24 xl:w-36 lg:py-1 xl:py-2 h-[80%] lg:h-auto text-center font-roboto text-[0.7rem] lg:text-[0.8rem] xl:text-[1.125rem] mt-0 lg:mt-0 mx-0 lg:mx-0 ${status === "loading" ? "hover:cursor-wait" : status === "success" ? "hover:cursor-not-allowed" : ""}`}
										>
											{idioma === 'es' ? (
												status === "loading"
													? "Enviando..."
													: status === "success"
													? "¡Listo!"
													: "Enviar"
												) : (
												status === "loading"
													? "Sending..."
													: status === "success"
													? "Done!"
													: "Send"
												)}
										</Button>
									</div>
								</div>
							</div>
							{status === "error" && (
								<p className="text-red-500">{message}</p>
							)}
							{status === "success" && (
								<p className="text-green-500">{message}</p>
							)}
						</form>
					</ContactBorder>
			</div>
		</div>
	);
}

export default ContactForm;
