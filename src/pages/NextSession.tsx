import { useState } from "react";
import { Bell } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function NextSession() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const { session } = useAuth();

  const { data: nextSessions = [], isLoading } = useQuery({
    queryKey: ['next-sessions', session?.user?.id],
    queryFn: async () => {
      try {
        if (!session?.user?.id) return [];

        const { data, error } = await supabase
          .from('case_sessions')
          .select(`
            id,
            session_date,
            case_id,
            procedure_type,
            room_number,
            title,
            start_time,
            end_time,
            participants,
            next_session_date,
            cases!inner (
              id,
              user_id,
              client,
              title
            )
          `)
          .eq('cases.user_id', session.user.id)
          .gte('session_date', new Date().toISOString())
          .order('session_date', { ascending: true });
        
        if (error) {
          console.error('Error fetching sessions:', error);
          toast.error('فشل في تحميل الجلسات');
          throw error;
        }
        
        return data || [];
      } catch (error) {
        console.error('Error fetching sessions:', error);
        toast.error('فشل في تحميل الجلسات');
        throw error;
      }
    },
    enabled: !!session?.user?.id
  });

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-[#111] to-[#1A1A1A]" dir="rtl">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
      </div>

      <main className={`flex-1 ${isMobile ? 'px-4' : 'pr-64'} overflow-auto`}>
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {/* Mobile menu button */}
          {isMobile && (
            <Button
              variant="ghost"
              className="glass-button text-white self-start p-2 rounded-lg mb-4"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Bell className="h-6 w-6" />
            </Button>
          )}

          {/* Header Section */}
          <div className="glass-card p-6 rounded-xl mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">الجلسة القادمة</h1>
            <p className="text-gray-400">عرض وإدارة الجلسات القادمة</p>
          </div>

          {/* Content Section */}
          <div className="glass-card p-6 rounded-xl">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-400">جاري التحميل...</p>
              </div>
            ) : nextSessions.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 mx-auto mb-4 text-[#4CD6B4] opacity-50" />
                <h3 className="text-lg font-medium text-white mb-2">لا توجد جلسات قادمة</h3>
                <p className="text-gray-400">لم يتم تسجيل أي جلسات قادمة بعد</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* We'll implement the sessions list UI here in the next iteration */}
                <p className="text-white">تم العثور على {nextSessions.length} جلسات قادمة</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {(isSidebarOpen || !isMobile) && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </div>
  );
}