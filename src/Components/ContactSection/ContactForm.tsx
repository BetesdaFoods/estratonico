"use client";
import ContactBorder from "../ui/ContactBorder";
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
		<section className="flex justify-center items-center pb-20 w-[100vw] h-[240px] lg:h-[500px] lg:w-[88vw] xl:w-[93%] xl:h-[600px] flex flex-col md:py-32 rounded-3xl relative isolate z-0 mb-20 lg:mb-0">
			<ContactBorder
				className={"mx-auto w-[90%] lg:w-[75%] xl:w-[75%]"}
				handleSubmit={handleSubmit}
				status={status}
				message={message}
				idioma={idioma}
			/>
		</section>
	);
}

export default ContactForm;
