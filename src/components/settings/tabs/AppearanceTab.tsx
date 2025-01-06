import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

export function AppearanceTab() {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <Card className="glass-card border-white/10 bg-white/5">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-xl font-semibold text-white mb-4">{t('appearance')}</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">{t('darkMode')}</Label>
              <p className="text-sm text-gray-400">{t('darkMode')}</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">{t('visualEffects')}</Label>
              <p className="text-sm text-gray-400">{t('visualEffects')}</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">{t('changeLanguage')}</Label>
              <p className="text-sm text-gray-400">
                {language === 'ar' ? 'التبديل بين العربية والإنجليزية' : 'Toggle between Arabic and English'}
              </p>
            </div>
            <Switch checked={language === 'en'} onCheckedChange={handleLanguageChange} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}