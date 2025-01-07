import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect } from "react";
import { Globe2 } from "lucide-react";

export function AppearanceTab() {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  useEffect(() => {
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <Card className="glass-card border-white/10 bg-white/5">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
          {t('appearance')}
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <div className="space-y-1">
              <Label className="text-white text-lg">{t('darkMode')}</Label>
              <p className="text-sm text-gray-400">{t('darkMode')}</p>
            </div>
            <Switch className="data-[state=checked]:bg-[#4CD6B4]" />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <div className="space-y-1">
              <Label className="text-white text-lg">{t('visualEffects')}</Label>
              <p className="text-sm text-gray-400">{t('visualEffects')}</p>
            </div>
            <Switch className="data-[state=checked]:bg-[#4CD6B4]" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-[#4CD6B4]" />
                <Label className="text-white text-lg">{t('changeLanguage')}</Label>
              </div>
              <p className="text-sm text-gray-400">
                {language === 'ar' ? 'التبديل بين العربية والإنجليزية' : 'Toggle between Arabic and English'}
              </p>
            </div>
            <Switch 
              checked={language === 'en'} 
              onCheckedChange={handleLanguageChange}
              className="data-[state=checked]:bg-[#4CD6B4]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}