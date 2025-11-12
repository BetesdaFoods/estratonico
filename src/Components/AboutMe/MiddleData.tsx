"use client";
import { useLanguage } from "../Context/LanguageContext";
import ButtonOval from "../ui/ButtonOval";
import ContentCard from "../ui/ContentCard";
import ContentCardDuo from "../ui/ContentCardDuo";

function MiddleData() {
	const {idioma } = useLanguage();
	return (
		<section className="w-screen flex flex-col items-center relative isolate z-0 px-0 bg-[#3BF3FF] h-[850px] lg:h-[300px] xl:h-[380px]">
			<div className="w-full lg:w-[95%] h-full flex items-center absolute flex-col lg:flex-row">
				<div className=" w-[90%] lg:w-[45%] h-auto flex flex-col lg:ml-10 relative lg:justify-center mt-6 lg:mt-0">
					<h2 className=" font-roboto font-black text-black
						uppercase
						text-[2rem]
						lg:text-[2.6rem]
						xl:text-[3.6rem]
						leading-[2.2rem]
						lg:leading-[2.8rem]
						xl:leading-[4rem]
					">
						{idioma === 'es' ? "estilo " : "Visual"}
						{idioma === 'es' ? <span className="text-white">visual</span> : <span className="text-white">Style</span>}
					</h2>
					<p
						className="font-roboto text-black
						pt-2 lg:pt-6
						md:pt-8 
						leading-[1.1]
						text-[0.9rem]
						lg:text-[1rem]
						xl:text-[1.2rem]"
					>
						{idioma === 'es' ? 
							"Un imaginario urbano y nocturno de estética cyberpunk elegante y poética, donde la ciudad respira en silencio. El neón corta la oscuridad y deja brillos sobre el vidrio y el asfalto húmedo. Las escenas privilegian la calma: marcos limpios, líneas sobrias y pausas que dejan espacio a la emoción. Los textos aparecen con discreción, como susurros que acompañan la imagen sin imponerse. Todo se siente contemporáneo pero cercano, con un pulso íntimo que busca consuelo y claridad entre rascacielos. La tecnología es telón de fondo; la mirada humana es el foco."
							:
							"An urban and nocturnal imagery with an elegant and poetic cyberpunk aesthetic, where the city breathes in silence. Neon cuts through the darkness and leaves glimmering reflections on the glass and wet asphalt. The scenes emphasize calm: clean frames, sober lines, and pauses that leave room for emotion. Texts appear discreetly, like whispers that accompany the image without imposing themselves. Everything feels contemporary yet intimate, with an intimate pulse that seeks solace and clarity among skyscrapers. Technology serves as a backdrop; the human gaze is the focus."}
					</p>
				</div>
				<div className="hidden lg:block w-[5%] h-full relative" />
				<div className="hidden lg:block w-1/2 lg:h-[100%] xl:h-[90%] flex items-center justify-end relative">
					<ContentCard
						titles={idioma === 'es' ? ["Nocturno Urbano", "Neón & Sombra", "Minimalismo Poético", "Humanidad Tecnológica"] : ["Urban Nocturne", "Neon & Shadow", "Poetic Minimalism", "Technological Humanity"]}
						descriptions={idioma === 'es' ? 
							[
							"Ciudad en penumbra con destellos de neón y atmósferas húmedas. Ritmo pausado, brillo de asfalto y vidrio.",
							"Contraste marcado entre luces eléctricas y sombras profundas. Los reflejos actúan como lenguaje visual.",
							"Composiciones limpias, espacio negativo y tipografías sobrias. Silencios visuales que invitan a sentir.",
							"La tecnología como escenario; la emoción humana como centro. Tono introspectivo que abre a la esperanza."
						] : [
							"A dimly lit city with flashes of neon and humid atmospheres. A slow rhythm, the shine of asphalt and glass.",
							"A marked contrast between electric lights and deep shadows. Reflections act as a visual language.",
							"Clean compositions, negative space, and restrained typography. Visual silences that invite feeling.",
							"Technology as the setting; human emotion as the focus. An introspective tone that opens up to hope."
						]}
						/>			
				</div>
				<div className="lg:hidden w-[80%] h-auto flex flex-col items-center justify-center mt-6 gap-6">
					<ContentCardDuo
						titles={idioma === 'es' ? ["Nocturno Urbano", "Neón & Sombra"] : ["Urban Nocturne", "Neon & Shadow"]}
						descriptions={idioma === 'es' ?
							[
								"Ciudad en penumbra con destellos de neón y atmósferas húmedas. Ritmo pausado, brillo de asfalto y vidrio.",
								"Contraste marcado entre luces eléctricas y sombras profundas. Los reflejos actúan como lenguaje visual."
							] : [
								"A dimly lit city with flashes of neon and humid atmospheres. A slow rhythm, the shine of asphalt and glass.",
								"A marked contrast between electric lights and deep shadows. Reflections act as a visual language."
							]
						}
					/>
					<ContentCardDuo
						titles={idioma === 'es' ? ["Minimalismo Poético", "Humanidad Tecnológica"] : ["Poetic Minimalism", "Technological Humanity"]}
						descriptions={idioma === 'es' ?
							[
								"Composiciones limpias, espacio negativo y tipografías sobrias. Silencios visuales que invitan a sentir.",
								"La tecnología como escenario; la emoción humana como centro. Tono introspectivo que abre a la esperanza."
							] : [
								"Clean compositions, negative space, and restrained typography. Visual silences that invite feeling.",
								"Technology as the setting; human emotion as the focus. An introspective tone that opens up to hope."
							]
						}
					/>
				</div>
			</div>
		</section>
	);
}

export default MiddleData;
