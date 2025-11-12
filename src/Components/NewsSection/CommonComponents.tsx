"use client";
import { useLanguage } from "../Context/LanguageContext";
import Link from "next/link";
import Image from "next/image";


type DateFormatterProps = { dateString: string | Date };

export default function DateFormatter({ dateString }: DateFormatterProps) {
    const { idioma } = useLanguage();
    const date = new Date(dateString);
    const locale = idioma === "es" ? "es-ES" : "en-US";
    let formatted = "";
    const year = date.getFullYear();
    if (locale.startsWith("es")) {
        const day = date.getDate();
        const month = date.toLocaleString("es-ES", { month: "long" });
        formatted = `${day} de ${month}`;
    } else {
        formatted = date.toLocaleDateString(locale, {
            month: "long",
            day: "numeric",
        });
    }
    return <><time dateTime={date.toISOString()} className="font-bold">{formatted}, </time><span>{year}</span></>;
}

export function NoticiasTitle() {
  const { idioma } = useLanguage();
  return (
    <h3 className="text-[25px] sm:text-4xl font-bold text-nowrap 2xl:text-6xl">
    	{idioma === "es" ? "NOTICIAS" : "NEWS"}
    </h3>
  );
}

export function SeeMoreButton({ link }: { link: string }) {
  const { idioma } = useLanguage();
  return (
    <Link
			href="/noticias/ultimas-noticias"
			className="flex items-center text-[#3BF3FF] font-bold xl:font-black text-nowrap lg:text-[25px] xl:text-lg 2xl:text-2xl hover:underline hover:cursor-pointer select-none transform transition-transform duration-300 hover:xl:scale-105 origin-[0%_50%]"
		>
        {idioma === "es" ? "VER MÁS" : "SEE MORE"}
		<Image
			className="ml-2"
			src="/assets/news-right-arrow.svg"
			alt="arrow"
			width={15}
			height={13}
		/>
    </Link>
  );
}