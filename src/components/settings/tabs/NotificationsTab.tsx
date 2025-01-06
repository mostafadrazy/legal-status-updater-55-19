import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function NotificationsTab() {
  return (
    <Card className="glass-card border-white/10 bg-white/5">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-xl font-semibold text-white mb-4">إعدادات الإشعارات</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">إشعارات البريد الإلكتروني</Label>
              <p className="text-sm text-gray-400">استلام التحديثات عبر البريد الإلكتروني</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">إشعارات المتصفح</Label>
              <p className="text-sm text-gray-400">إظهار إشعارات على سطح المكتب</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">تحديثات القضايا</Label>
              <p className="text-sm text-gray-400">إشعارات عند تحديث حالة القضايا</p>
            </div>
            <Switch />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}