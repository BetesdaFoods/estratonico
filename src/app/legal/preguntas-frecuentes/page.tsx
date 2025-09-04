import LegalInfo from "@/Components/Legal/LegalInfo";
import { description, date } from "@/Components/Legal/template";

export const metadata = {
	title: "Preguntas Frecuentes",
	description: "Preguntas frecuentes sobre Estratónico",
};

function page() {
	return (
		<LegalInfo
			info={{
				title: "Preguntas Frecuentes",
				description,
				date,
			}}
		/>
	);
}

export default page;
