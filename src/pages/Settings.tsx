import { useAuth } from "@/contexts/AuthContext";
import { Settings as SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { supabase } from "@/integrations/supabase/client";
import { AvatarUpload } from "@/components/settings/AvatarUpload";
import { ProfileForm } from "@/components/settings/ProfileForm";

interface ProfileData {
  full_name: string | null;
  phone_number: string | null;
}

export default function Settings() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        setProfileData(data);
      }

      const { data: avatarData } = await supabase
        .storage
        .from('avatars')
        .getPublicUrl(`${user.id}`);

      if (avatarData) {
        setAvatarUrl(avatarData.publicUrl);
      }
    };

    fetchProfile();
  }, [user]);

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
            <h1 className="text-3xl font-bold text-gray-900">الإعدادات</h1>
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