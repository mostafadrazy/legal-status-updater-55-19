import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function SidebarProfile() {
  const { user, signOut } = useAuth();
  const [profileData, setProfileData] = useState<{
    full_name?: string | null;
    avatar_url?: string | null;
  }>({});

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      if (!error && data) {
        setProfileData(data);
      }
    };

    fetchProfile();

    const channel = supabase
      .channel('profile_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user?.id}`,
        },
        (payload) => {
          console.log('Profile updated:', payload);
          setProfileData(payload.new as any);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  return (
    <div className="mt-auto glass-card rounded-lg p-4">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10 border-2 border-[#4CD6B4]/30">
          <AvatarImage src={profileData.avatar_url || undefined} className="object-cover" />
          <AvatarFallback className="bg-[#4CD6B4]/10 text-[#4CD6B4]">
            {profileData.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white">{profileData.full_name || 'مستخدم'}</span>
          <span className="text-xs text-[#4CD6B4]">محامي</span>
        </div>
      </div>
      <button
        onClick={signOut}
        className="w-full flex items-center gap-3 px-3 py-2 mt-4 rounded-lg text-red-400 hover:text-red-300 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md"
      >
        <LogOut className="w-5 h-5" />
        <span>تسجيل الخروج</span>
      </button>
    </div>
  );
}