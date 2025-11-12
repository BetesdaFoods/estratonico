import Cover from "@/Components/AboutMe/Cover";
import LastData from "@/Components/AboutMe/LastData";
import MiddleData from "@/Components/AboutMe/MiddleData";
import MyStory from "@/Components/AboutMe/MyStory";

function page() {
	return (
		<main>
			<Cover />
			<MyStory />
			<MiddleData />
			<LastData />
		</main>
	);
}

export default page;
