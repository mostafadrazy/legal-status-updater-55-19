import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function SidebarProfile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<{
    full_name?: string | null;
    avatar_url?: string | null;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching profile for user:', user.id);
      
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        setError("حدث خطأ أثناء تحميل الملف الشخصي");
        throw error;
      }

      console.log('Fetched profile data:', data);

      if (data) {
        setProfileData(data);
      }
    } catch (error) {
      console.error("Error in profile management:", error);
      setError("حدث خطأ في تحميل البيانات");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (error) {
    return (
      <div className="glass-card rounded-lg p-4">
        <div className="text-center space-y-2">
          <p className="text-sm text-red-400">{error}</p>
          <Button
            onClick={fetchProfile}
            variant="ghost"
            size="sm"
            className="w-full text-[#4CD6B4] hover:text-[#4CD6B4] hover:bg-white/5"
          >
            <RefreshCw className="w-4 h-4 ml-2" />
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="glass-card rounded-lg p-4">
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#4CD6B4] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

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
        onClick={handleSignOut}
        className="w-full flex items-center gap-3 px-3 py-2 mt-4 rounded-lg text-red-400 hover:text-red-300 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md"
      >
        <LogOut className="w-5 h-5" />
        <span>تسجيل الخروج</span>
      </button>
    </div>
  );
}