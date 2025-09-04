import LegalInfo from "@/Components/Legal/LegalInfo";
import { description, date } from "@/Components/Legal/template";

export const metadata = {
	title: "Política de privacidad",
	description: "Política de privacidad de Estratónico",
};

function page() {
	return (
		<LegalInfo
			info={{
				title: "Política de privacidad",
				description,
				date,
			}}
		/>
	);
}

export default page;
