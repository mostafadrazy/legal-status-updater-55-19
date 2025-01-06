import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

export function AppearanceTab() {
  const { language, setLanguage } = useLanguage();
  const { toast } = useToast();

  const handleLanguageChange = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    
    toast({
      title: newLang === 'ar' ? "تم تغيير اللغة" : "Language Changed",
      description: newLang === 'ar' ? "تم التحويل إلى العربية" : "Switched to English",
    });
  };

  const translations = {
    ar: {
      appearance: "تخصيص المظهر",
      darkMode: "الوضع الليلي",
      darkModeDesc: "تفعيل المظهر الداكن",
      visualEffects: "التأثيرات البصرية",
      visualEffectsDesc: "تفعيل الرسوم المتحركة",
      language: "تغيير اللغة",
      languageDesc: "التبديل بين العربية والإنجليزية"
    },
    en: {
      appearance: "Customize Appearance",
      darkMode: "Dark Mode",
      darkModeDesc: "Enable dark theme",
      visualEffects: "Visual Effects",
      visualEffectsDesc: "Enable animations",
      language: "Change Language",
      languageDesc: "Switch between Arabic and English"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <Card className="glass-card border-white/10 bg-white/5">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-xl font-semibold text-white mb-4">{t.appearance}</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">{t.darkMode}</Label>
              <p className="text-sm text-gray-400">{t.darkModeDesc}</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">{t.visualEffects}</Label>
              <p className="text-sm text-gray-400">{t.visualEffectsDesc}</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">{t.language}</Label>
              <p className="text-sm text-gray-400">{t.languageDesc}</p>
            </div>
            <Switch 
              checked={language === 'en'} 
              onCheckedChange={handleLanguageChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}