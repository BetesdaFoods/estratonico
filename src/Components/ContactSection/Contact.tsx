import Image from "next/image";
import ContactForm from "./ContactForm";
import HeaderMusic from "./HeaderMusic";

export default function Contact() {
	return (
		<section className="w-full h-full bg-neutral-900 bg-opacity-[.97] relative">
			<Image
				fill
				src="/assets/scratched-folded-background 1.png"
				alt="Background"
				className="absolute top-0 left-0 w-full h-full object-cover -z-10"
			/>
			<div className="flex flex-col items-center justify-evenly sm:gap-4 md:gap-12 lg:gap-20 md:py-10 md:px-6">
				<HeaderMusic />
				<ContactForm />
			</div>
		</section>
	);
}
