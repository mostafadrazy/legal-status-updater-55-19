import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

type Language = 'ar' | 'en';

interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

const translations: Translations = {
  settings: {
    ar: 'الإعدادات',
    en: 'Settings'
  },
  appearance: {
    ar: 'تخصيص المظهر',
    en: 'Customize Appearance'
  },
  darkMode: {
    ar: 'الوضع الليلي',
    en: 'Dark Mode'
  },
  visualEffects: {
    ar: 'التأثيرات البصرية',
    en: 'Visual Effects'
  },
  changeLanguage: {
    ar: 'تغيير اللغة',
    en: 'Change Language'
  },
  languageChanged: {
    ar: 'تم تغيير اللغة',
    en: 'Language Changed'
  },
  switchedTo: {
    ar: 'تم التحويل إلى العربية',
    en: 'Switched to English'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');
  const { toast } = useToast();

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    
    toast({
      title: translations.languageChanged[newLang],
      description: translations.switchedTo[newLang],
    });
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};