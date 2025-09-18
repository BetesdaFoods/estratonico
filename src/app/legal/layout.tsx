import LegalNavbar from "@/Components/Navbar/LegalNavbar";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	const links = [
		{ name: "Términos y Condiciones", href: "/legal/terminos-de-uso" },
		{
			name: "Política de privacidad",
			href: "/legal/politica-de-privacidad",
		},
		{ name: "Preguntas Frecuentes", href: "/legal/preguntas-frecuentes" },
		{ name: "Política de Cookies", href: "/legal/cookies" },
	];

	return (
		<>
			<LegalNavbar links={links} />
			{children}
		</>
	);
}

export default Layout;
