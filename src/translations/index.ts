export const translations = {
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
  },
  
  // New translations
  enableNotifications: {
    ar: 'تفعيل الإشعارات',
    en: 'Enable Notifications'
  },
  emailNotifications: {
    ar: 'إشعارات البريد الإلكتروني',
    en: 'Email Notifications'
  },
  pushNotifications: {
    ar: 'إشعارات الجوال',
    en: 'Push Notifications'
  },
  sessionReminders: {
    ar: 'تذكير بالجلسات',
    en: 'Session Reminders'
  },
  caseUpdates: {
    ar: 'تحديثات القضايا',
    en: 'Case Updates'
  },
  systemUpdates: {
    ar: 'تحديثات النظام',
    en: 'System Updates'
  }
} as const;

export type TranslationKey = keyof typeof translations;