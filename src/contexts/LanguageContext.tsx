import React, { createContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { translations } from '../translations';
import type { TranslationKey } from '../translations';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  dir: () => "rtl" | "ltr";
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('preferred-language');
    return (savedLang as Language) || 'ar';
  });

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('preferred-language', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    
    toast.success(translations.languageChanged[newLang], {
      description: translations.switchedTo[newLang],
    });
  };

  const t = (key: TranslationKey): string => {
    return translations[key]?.[language] || key;
  };

  const dir = (): "rtl" | "ltr" => {
    return language === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}