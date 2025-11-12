"use client";
import Button from "../ui/Button";
import { useLanguage } from "../Context/LanguageContext";

export default function ReadArticleButton({link}: {link?: string}) {
  const { idioma } = useLanguage();
  return (
    <Button
      href={link || "/contacto"}
      className="uppercase py-4 px-6 lg:px-10 xl:px-10 lg:py-3 xl:py-4 font-orbitron lg:text-[18px] xl:text-[18px] font-black"
    >
      {idioma === "es" ? "Leer artículo" : "Read article"}
    </Button>
  );
}
