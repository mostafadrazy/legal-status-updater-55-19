import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function AppearanceTab() {
  const [currentLanguage, setCurrentLanguage] = useState("ar");
  const { toast } = useToast();

  const handleLanguageChange = (value: string) => {
    setCurrentLanguage(value);
    document.documentElement.dir = value === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = value;
    
    toast({
      title: value === "ar" ? "تم تغيير اللغة" : "Language Changed",
      description: value === "ar" ? "تم تغيير لغة التطبيق إلى العربية" : "Application language changed to English",
    });
  };

  return (
    <Card className="border-white/10 bg-[#1E293B]">
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
              <Label className="text-white">اللغة</Label>
              <p className="text-sm text-gray-400">تغيير لغة التطبيق</p>
            </div>
            <Select value={currentLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32 bg-[#4CD6B4] hover:bg-[#3bc4a2] text-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}