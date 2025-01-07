import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

type Language = 'ar' | 'en';

interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

const translations: Translations = {
  // General
  loading: {
    ar: 'جاري التحميل...',
    en: 'Loading...'
  },
  error: {
    ar: 'حدث خطأ',
    en: 'An error occurred'
  },
  success: {
    ar: 'تم بنجاح',
    en: 'Success'
  },
  
  // Navigation & Sidebar
  dashboard: {
    ar: 'لوحة التحكم',
    en: 'Dashboard'
  },
  cases: {
    ar: 'القضايا',
    en: 'Cases'
  },
  nextSession: {
    ar: 'الجلسة القادمة',
    en: 'Next Session'
  },
  settings: {
    ar: 'الإعدادات',
    en: 'Settings'
  },
  profile: {
    ar: 'الملف الشخصي',
    en: 'Profile'
  },
  logout: {
    ar: 'تسجيل الخروج',
    en: 'Logout'
  },

  // Settings
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
  },
  notifications: {
    ar: 'الإشعارات',
    en: 'Notifications'
  },
  security: {
    ar: 'الأمان',
    en: 'Security'
  },

  // Cases
  addCase: {
    ar: 'إضافة قضية',
    en: 'Add Case'
  },
  caseDetails: {
    ar: 'تفاصيل القضية',
    en: 'Case Details'
  },
  caseNumber: {
    ar: 'رقم القضية',
    en: 'Case Number'
  },
  client: {
    ar: 'العميل',
    en: 'Client'
  },
  status: {
    ar: 'الحالة',
    en: 'Status'
  },
  court: {
    ar: 'المحكمة',
    en: 'Court'
  },
  
  // Calendar
  calendar: {
    ar: 'التقويم',
    en: 'Calendar'
  },
  today: {
    ar: 'اليوم',
    en: 'Today'
  },
  week: {
    ar: 'الأسبوع',
    en: 'Week'
  },
  month: {
    ar: 'الشهر',
    en: 'Month'
  },

  // Form Labels
  save: {
    ar: 'حفظ',
    en: 'Save'
  },
  cancel: {
    ar: 'إلغاء',
    en: 'Cancel'
  },
  delete: {
    ar: 'حذف',
    en: 'Delete'
  },
  edit: {
    ar: 'تعديل',
    en: 'Edit'
  },
  search: {
    ar: 'بحث',
    en: 'Search'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: () => "rtl" | "ltr";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

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

  const t = (key: string): string => {
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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};