import { Settings as SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "@/components/settings/tabs/ProfileTab";
import { NotificationsTab } from "@/components/settings/tabs/NotificationsTab";
import { AppearanceTab } from "@/components/settings/tabs/AppearanceTab";
import { SecurityTab } from "@/components/settings/tabs/SecurityTab";

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

        if (error) throw error;

        if (!data) {
          const { error: createError } = await supabase
            .from("profiles")
            .insert([{ id: user.id }]);

          if (createError) throw createError;

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
    <div className="min-h-screen flex w-full bg-[#111]" dir="rtl">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
      </div>

      <main className="flex-1 pr-64 overflow-auto">
        <div className="p-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <SettingsIcon className="w-8 h-8 text-[#4CD6B4]" />
            <h1 className="text-3xl font-bold text-white">الإعدادات</h1>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="profile" className="data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black">
                الملف الشخصي
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black">
                الإشعارات
              </TabsTrigger>
              <TabsTrigger value="appearance" className="data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black">
                المظهر
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black">
                الأمان
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileTab 
                userId={user.id}
                userEmail={user.email}
                profileData={profileData}
                avatarUrl={avatarUrl}
                onUpdateProfile={setProfileData}
              />
            </TabsContent>

            <TabsContent value="notifications">
              <NotificationsTab />
            </TabsContent>

            <TabsContent value="appearance">
              <AppearanceTab />
            </TabsContent>

            <TabsContent value="security">
              <SecurityTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Sidebar />
    </div>
  );
}