import { Settings as SettingsIcon, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ProfileTab } from "@/components/settings/tabs/ProfileTab";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        console.log('Fetching profile for user:', user.id);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          setError("حدث خطأ أثناء تحميل الملف الشخصي");
          toast({
            variant: "destructive",
            title: "خطأ في تحميل البيانات",
            description: "يرجى تحديث الصفحة والمحاولة مرة أخرى",
          });
          throw error;
        }

        console.log('Fetched profile data:', data);

        if (!data) {
          console.log('No profile found, creating new profile');
          const { error: createError } = await supabase
            .from("profiles")
            .insert([{ id: user.id }]);

          if (createError) {
            console.error('Error creating profile:', createError);
            setError("حدث خطأ أثناء إنشاء الملف الشخصي");
            throw createError;
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
        setError("حدث خطأ في إدارة الملف الشخصي");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  if (!user) return null;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111]">
        <div className="text-center p-8">
          <h2 className="text-xl text-red-500 mb-4">{error}</h2>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-[#4CD6B4] hover:bg-[#3BC4A2] text-white"
          >
            إعادة تحميل الصفحة
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111]">
        <div className="w-8 h-8 border-4 border-[#4CD6B4] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-full bg-[#111]" dir="rtl">
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
            <h1 className="text-2xl md:text-3xl font-bold text-white">الإعدادات</h1>
          </div>

          <div className="space-y-6">
            <ProfileTab 
              userId={user.id}
              userEmail={user.email}
              profileData={profileData}
              avatarUrl={avatarUrl}
              onUpdateProfile={setProfileData}
            />
          </div>
        </div>
      </main>
      
      {(isSidebarOpen || !isMobile) && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </div>
  );
}