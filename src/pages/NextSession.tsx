import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { addDays, startOfWeek } from "date-fns";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NextSession() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return startOfWeek(today, { weekStartsOn: 1 }); // Start from Monday
  });
  
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const { session } = useAuth();

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['next-sessions', session?.user?.id, startDate],
    queryFn: async () => {
      try {
        if (!session?.user?.id) return [];

        const { data, error } = await supabase
          .from('case_sessions')
          .select(`
            id,
            session_date,
            next_session_date,
            case_id,
            procedure_type,
            room_number,
            title,
            start_time,
            end_time,
            participants,
            cases (
              client,
              court,
              case_type
            )
          `)
          .eq('user_id', session.user.id)
          .gte('next_session_date', startDate.toISOString())
          .lte('next_session_date', addDays(startDate, 6).toISOString())
          .order('next_session_date', { ascending: true });
        
        if (error) {
          console.error('Error fetching sessions:', error);
          toast.error('فشل في تحميل الجلسات');
          throw error;
        }

        const transformedData = data?.map(session => ({
          ...session,
          court: session.cases?.court,
          case_type: session.cases?.case_type,
          client: session.cases?.client
        }));
        
        return transformedData || [];
      } catch (error) {
        console.error('Error fetching sessions:', error);
        toast.error('فشل في تحميل الجلسات');
        throw error;
      }
    },
    enabled: !!session?.user?.id
  });

  const handleNavigateWeek = (direction: 'prev' | 'next') => {
    setStartDate(currentDate => {
      const days = direction === 'prev' ? -7 : 7;
      return addDays(currentDate, days);
    });
  };

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-[#111] to-[#1A1A1A]" dir="rtl">
      {/* Enhanced background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
      </div>

      <main className={`flex-1 ${isMobile ? 'px-4' : 'pr-64'} overflow-auto`}>
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
          {/* Mobile menu button with enhanced styling */}
          {isMobile && (
            <Button
              variant="ghost"
              className="glass-button text-white self-start p-2 rounded-lg mb-4 hover:bg-white/10 transition-all duration-300"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}

          {/* Enhanced Header Section */}
          <div className="glass-card p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4 animate-fade-in">الجلسات القادمة</h1>
            <p className="text-gray-400 text-lg animate-fade-in delay-100">عرض وإدارة مواعيد الجلسات القادمة</p>
          </div>

          {/* Enhanced Calendar Section with glass effect */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg animate-fade-in delay-200">
            <CalendarHeader 
              startDate={startDate}
              onNavigateWeek={handleNavigateWeek}
            />
          </div>

          {/* Enhanced Calendar Grid */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg animate-fade-in delay-300">
            <CalendarGrid
              sessions={sessions}
              isLoading={isLoading}
              startDate={startDate}
            />
          </div>
        </div>
      </main>
      
      {(isSidebarOpen || !isMobile) && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </div>
  );
}