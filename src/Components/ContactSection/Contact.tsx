import ContactForm from "./ContactForm";

export default function Contact() {
	return (
		<section className="w-full h-full bg-black relative">
			<div className="flex flex-col items-center justify-evenly sm:gap-4 md:gap-12 lg:gap-20 md:py-10 md:px-6">
				<ContactForm />
			</div>
		</section>
	);
}
