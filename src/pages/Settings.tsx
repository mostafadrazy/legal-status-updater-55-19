import { useAuth } from "@/contexts/AuthContext";
import { Settings as SettingsIcon, User, Lock, Bell, Palette } from "lucide-react";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { supabase } from "@/integrations/supabase/client";
import { AvatarUpload } from "@/components/settings/AvatarUpload";
import { ProfileForm } from "@/components/settings/ProfileForm";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ProfileData {
  full_name: string | null;
  phone_number: string | null;
}

export default function Settings() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile:", error);
          toast({
            variant: "destructive",
            title: "خطأ في تحميل البيانات",
            description: "يرجى المحاولة مرة أخرى لاحقاً",
          });
          return;
        }

        if (!data) {
          const { error: createError } = await supabase
            .from("profiles")
            .insert([{ id: user.id }]);

          if (createError) {
            console.error("Error creating profile:", createError);
            toast({
              variant: "destructive",
              title: "خطأ في إنشاء الملف الشخصي",
              description: "يرجى المحاولة مرة أخرى لاحقاً",
            });
            return;
          }

          setProfileData({ full_name: null, phone_number: null });
        } else {
          setProfileData(data);
          if (data.avatar_url) {
            setAvatarUrl(data.avatar_url);
          }
        }
      } catch (error) {
        console.error("Error in profile management:", error);
        toast({
          variant: "destructive",
          title: "خطأ غير متوقع",
          description: "يرجى المحاولة مرة أخرى لاحقاً",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex w-full bg-[#111]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
      </div>

      <Sidebar />
      
      <main className="flex-1 overflow-auto relative">
        <div className="p-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <SettingsIcon className="w-8 h-8 text-[#4CD6B4]" />
            <h1 className="text-3xl font-bold text-white">الإعدادات</h1>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="profile" className="data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black">
                <User className="w-4 h-4 mr-2" />
                الملف الشخصي
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black">
                <Bell className="w-4 h-4 mr-2" />
                الإشعارات
              </TabsTrigger>
              <TabsTrigger value="appearance" className="data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black">
                <Palette className="w-4 h-4 mr-2" />
                المظهر
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black">
                <Lock className="w-4 h-4 mr-2" />
                الأمان
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card className="glass-card border-white/10 bg-white/5">
                <CardContent className="p-6 space-y-8">
                  <AvatarUpload 
                    userId={user.id}
                    userEmail={user.email}
                    fullName={profileData?.full_name || undefined}
                    initialAvatarUrl={avatarUrl}
                  />

                  <ProfileForm 
                    userId={user.id}
                    initialData={profileData || undefined}
                    onUpdate={setProfileData}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
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
            </TabsContent>

            <TabsContent value="appearance">
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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}