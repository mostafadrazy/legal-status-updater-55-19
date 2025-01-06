import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function SecurityTab() {
  return (
    <Card className="glass-card border-white/10 bg-white/5">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-xl font-semibold text-white mb-4">إعدادات الأمان</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">المصادقة الثنائية</Label>
              <p className="text-sm text-gray-400">تفعيل طبقة حماية إضافية</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">تسجيل الدخول عبر البصمة</Label>
              <p className="text-sm text-gray-400">استخدام البصمة للدخول</p>
            </div>
            <Switch />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}