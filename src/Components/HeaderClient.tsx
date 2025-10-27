"use client";

import React from "react";
import Navbar from "@/Components/Navbar/Navbar";
import { useLanguage } from '@/Components/Context/LanguageContext';

type NavMap = Record<string, { name: string; href: string }>;
type LinkItem = { titleEN: string; name: string; nameEN: string; href: string; logo: string };

interface HeaderClientProps {
  navigation: NavMap;
  socials: LinkItem[];
  musicPlatforms: LinkItem[];
  idioma: LinkItem[];
}

export default function HeaderClient({
  navigation,
  socials,
  musicPlatforms,
  idioma,
}: HeaderClientProps) {
  const { idioma: idiomaSelected, setIdioma } = useLanguage();

  const onSetIdioma = (newIdioma: string) => {
    setIdioma(newIdioma as any);
  };

  return (
    <Navbar
      navigation={navigation}
      socials={socials}
      musicPlatforms={musicPlatforms}
      idioma={idioma}
      setIdioma={onSetIdioma}
      idiomaSelected={idiomaSelected}
    />
  );
}
