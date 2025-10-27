'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type IdiomaCode = 'es' | 'en';

type LanguageContextValue = {
  idioma: IdiomaCode;
  setIdioma: React.Dispatch<React.SetStateAction<IdiomaCode>>;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({
  children,
  defaultIdioma = 'es',
}: {
  children: React.ReactNode;
  defaultIdioma?: IdiomaCode;
}) {
  const [idioma, setIdioma] = useState<IdiomaCode>(defaultIdioma);

  // Opcional: persistir en localStorage
  useEffect(() => {
    const saved = (localStorage.getItem('lang') as IdiomaCode | null);
    if (saved) setIdioma(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem('lang', idioma);
    document.cookie = `lang=${idioma}; path=/; max-age=31536000`; // opcional: cookie
  }, [idioma]);

  return (
    <LanguageContext.Provider value={{ idioma, setIdioma }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  return ctx;
}