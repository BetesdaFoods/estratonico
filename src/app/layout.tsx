import React from "react";
// import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import { Roboto } from "next/font/google";
import HeaderClient from "@/Components/HeaderClient";
import Footer from "@/Components/Footer/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from '@/Components/Context/LanguageContext';

import "./globals.scss";
import { title } from "process";

const robotoFont = Roboto({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
	weight: ["100", "300", "400", "500", "700", "900"],
});

const orbiFont = Orbitron({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-orbitron",
	weight: ["400", "600", "700", "900"],
});

const navigation = {
	navbar: {
		home: { name: "HOME", href: "/" },
		aboutMe: { name: "SOBRE MI", href: "/sobre_mi" },
		news: { name: "NOTICIAS", href: "/noticias" },
		music: { name: "MÚSICA", href: "/musica" },
		contact: { name: "CONTACTO", href: "/contacto" },
	},
	footer: {
		"Social Media": [
			{
				titleEN: "Social Media",
				name: "Instagram",
				nameEN: "Instagram",
				href: "https://www.instagram.com/imestratonico",
				logo: "/assets/footer-insta.svg",
			},
			{
				titleEN: "Social Media",
				name: "Facebook",
				nameEN: "Facebook",
				href: "https://www.facebook.com/imestratonico",
				logo: "/assets/footer-facebook.svg",
			},
			{
				titleEN: "Social Media",
				name: "TikTok",
				nameEN: "TikTok",
				href: "https://www.tiktok.com/@estratonico",
				logo: "/assets/tiktok-footer.svg",
			},
			{
				titleEN: "Social Media",
				name: "YouTube",
				nameEN: "YouTube",
				href: "https://www.youtube.com/@estratonico?sub_confirmation=1",
				logo: "/assets/youtube-footer.svg",
			},
			{
				titleEN: "Social Media",
				name: "X",
				nameEN: "X",
				href: "https://x.com/ImEstratonico",
				logo: "/assets/x-footer.svg",
			},
		],
		Plataformas: [
			{
				titleEN: "Platforms",
				name: "Spotify",
				nameEN: "Spotify",
				href: "https://www.spotify.com/artist/2BrhlQ1HbzeOyKUIWZMA3i",
				logo: "/assets/spotify-footer.svg",
			},
			{
				titleEN: "Platforms",
				name: "Amazon Music",
				nameEN: "Amazon Music",
				href: "https://music.amazon.com", // FALTA
				logo: "/assets/amazon-footer.svg",
			},
			{
				titleEN: "Platforms",
				name: "Apple Music",
				nameEN: "Apple Music",
				href: "https://music.apple.com", // FALTA
				logo: "/assets/apple-footer.svg",
			},
			{
				titleEN: "Platforms",
				name: "YouTube Music",
				nameEN: "YouTube Music",
				href: "https://music.youtube.com", // FALTA
				logo: "/assets/youtube-music.svg",
			},
		],
		Idioma: [
			{
				titleEN: "Language",
				name: "Español",
				nameEN: "Spanish",
				href: "es",
				logo: "/assets/Flag_of_Spain.svg"
			},
			{
				titleEN: "Language",
				name: "English",
				nameEN: "English",
				href: "en",
				logo: "/assets/Flag_of_the_United_States.svg"
			},
		],
		Legal: [
			{
				titleEN: "Legal",
				name: "Términos y Condiciones",
				nameEN: "Terms and Conditions",
				href: "/legal/terminos-de-uso",
				logo: "",
			},
			{
				titleEN: "Legal",
				name: "Política de privacidad",
				nameEN: "Privacy Policy",
				href: "/legal/politica-de-privacidad",
				logo: "",
			},
			{
				titleEN: "Legal",
				name: "Preguntas Frecuentes",
				nameEN: "FAQs",
				href: "/legal/preguntas-frecuentes",
				logo: "" },
			{ 
				titleEN: "Legal",
				name: "Cookies", 
				nameEN: "Cookies",
				href: "/legal/cookies", 
				logo: "" },
		],
	},
};

export const metadata = {
	title: {
		default: "Estratonico",
		template: "%s - Estratonico",
	},
	description:
		"Estratonico - Tu portal de noticias y música con las últimas novedades.",
	openGraph: {
		title: "Estratonico",
		description:
			"Tu portal de noticias y música con las últimas novedades.",
		type: "website",
		images: [
			{
				url: "/assets/estratonicos-home.png",
				width: 1200,
				height: 630,
				alt: "Estratonico preview image",
			},
		],
		url: "https://estratonico.com",
	},
	twitter: {
		card: "summary_large_image",
	},
	icons: {
		// The default icon
		icon: "/assets/favicon-light.png",
		// You can provide an array for icons with media queries
		other: [
			{
				url: "/assets/favicon-dark.png",
				media: "(prefers-color-scheme: dark)",
			},
		],
	},
	metadataBase: new URL("https://estratonico.com"),
};

export const revalidate = 3600; // 1 hour revalidation for all pages by default

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={` ${orbiFont.variable} ${robotoFont.variable}`}
		>
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
			</head>
			<body className="bg-black font-roboto text-white">
				<LanguageProvider>
					<HeaderClient
						navigation={navigation.navbar}
						socials={navigation.footer["Social Media"]}
						musicPlatforms={navigation.footer.Plataformas}
						idioma={navigation.footer.Idioma}
					/>
					<div className="overflow-hidden">{children}</div>
					<div className="relative">
						<div
							aria-hidden="true"
							className="pointer-events-none absolute -top-12 left-0 w-full h-12 bg-gradient-to-t from-[#2fa3ad]/30 to-transparent z-10"
						/>
						<Footer navigation={navigation.footer} />
					</div>
				</LanguageProvider>
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
