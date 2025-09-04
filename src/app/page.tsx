import React from "react";
import Hero from "@/Components/HeroSection/Hero";
import NewsSection from "@/Components/NewsSection/NewsSection";
import Contact from "@/Components/ContactSection/Contact";

export const metadata = {
	title: "Inicio - Estratonico",
};

function page() {
	return (
		<main>
			<Hero />
			<NewsSection />
			<Contact />
		</main>
	);
}

export default page;
