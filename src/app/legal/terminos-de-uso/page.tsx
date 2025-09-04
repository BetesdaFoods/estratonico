import LegalInfo from "@/Components/Legal/LegalInfo";
import { description, date } from "@/Components/Legal/template";

export const metadata = {
	title: "Términos y Condiciones",
	description: "Términos y condiciones de Estratónico",
};

function page() {
	return (
		<LegalInfo
			info={{
				title: "Términos y Condiciones",
				description,
				date,
			}}
		/>
	);
}

export default page;
