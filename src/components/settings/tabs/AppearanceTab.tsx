import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function AppearanceTab() {
  const [currentLang, setCurrentLang] = useState('ar');
  const { toast } = useToast();

  const handleLanguageChange = () => {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    setCurrentLang(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    
    toast({
      title: newLang === 'ar' ? "تم تغيير اللغة" : "Language Changed",
      description: newLang === 'ar' ? "تم التحويل إلى العربية" : "Switched to English",
    });
  };

  return (
    <Card className="glass-card border-white/10 bg-white/5">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-xl font-semibold text-white mb-4">تخصيص المظهر</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">الوضع الليلي</Label>
              <p className="text-sm text-gray-400">تفعيل المظهر الداكن</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">التأثيرات البصرية</Label>
              <p className="text-sm text-gray-400">تفعيل الرسوم المتحركة</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">تغيير اللغة</Label>
              <p className="text-sm text-gray-400">التبديل بين العربية والإنجليزية</p>
            </div>
            <Switch checked={currentLang === 'en'} onCheckedChange={handleLanguageChange} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}