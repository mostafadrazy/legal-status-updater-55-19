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
        .single();

      if (!error && data) {
        setProfileData(data);
      }
    };

    fetchProfile();

    // Subscribe to realtime changes
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
          setProfileData(payload.new as any);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  return (
    <div className="mt-auto">
      <div className="flex items-center gap-3 px-3 py-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={profileData.avatar_url || undefined} className="object-cover" />
          <AvatarFallback className="bg-[#4CD6B4]/10 text-[#4CD6B4]">
            {profileData.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm text-white">{profileData.full_name || 'مستخدم'}</span>
          <span className="text-xs text-[#4CD6B4]">محامي</span>
        </div>
      </div>
      <button
        onClick={signOut}
        className="w-full flex items-center gap-3 px-3 py-2 mt-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-800/50 transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md"
      >
        <LogOut className="w-5 h-5" />
        <span>تسجيل الخروج</span>
      </button>
    </div>
  );
}