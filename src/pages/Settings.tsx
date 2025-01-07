import { Settings as SettingsIcon, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "@/components/settings/tabs/ProfileTab";
import { NotificationsTab } from "@/components/settings/tabs/NotificationsTab";
import { AppearanceTab } from "@/components/settings/tabs/AppearanceTab";
import { SecurityTab } from "@/components/settings/tabs/SecurityTab";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProfileData {
  full_name: string | null;
  phone_number: string | null;
}

export default function Settings() {
  const { user } = useAuth();
  const { t, dir } = useLanguage();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

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
        toast.error(t('error'), {
          description: t('tryAgainLater'),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, t]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex w-full bg-[#111]" dir={dir()}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
      </div>

      <main className={`flex-1 ${isMobile ? 'px-4' : 'pr-64'} overflow-auto`}>
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          {isMobile && (
            <Button
              variant="ghost"
              className="glass-button text-white self-start p-2 rounded-lg backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 mb-4"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}

          <div className="flex items-center gap-3 mb-8">
            <SettingsIcon className="w-6 h-6 md:w-8 md:h-8 text-[#4CD6B4]" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">{t('settings')}</h1>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10 w-full flex flex-wrap justify-start">
              <TabsTrigger value="profile" className="flex-1 data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black">
                {t('profile')}
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex-1 data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black">
                {t('notifications')}
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex-1 data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black">
                {t('appearance')}
              </TabsTrigger>
              <TabsTrigger value="security" className="flex-1 data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black">
                {t('security')}
              </TabsTrigger>
            </TabsList>

            <div className="space-y-6">
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
            </div>
          </Tabs>
        </div>
      </main>
      
      {(isSidebarOpen || !isMobile) && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </div>
  );
}