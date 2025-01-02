import { useAuth } from "@/contexts/AuthContext";
import { Settings as SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { supabase } from "@/integrations/supabase/client";
import { AvatarUpload } from "@/components/settings/AvatarUpload";
import { ProfileForm } from "@/components/settings/ProfileForm";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  full_name: string | null;
  phone_number: string | null;
}

export default function Settings() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { toast } = useToast();

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

        // If no profile exists, create one
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
        }

        // Get avatar URL if it exists
        if (data?.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        console.error("Error in profile management:", error);
        toast({
          variant: "destructive",
          title: "خطأ غير متوقع",
          description: "يرجى المحاولة مرة أخرى لاحقاً",
        });
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
        <div className="p-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <SettingsIcon className="w-8 h-8 text-[#4CD6B4]" />
            <h1 className="text-3xl font-bold text-white">الإعدادات</h1>
          </div>

          <div className="glass-card p-6 rounded-xl space-y-8">
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
          </div>
        </div>
      </main>
    </div>
  );
}