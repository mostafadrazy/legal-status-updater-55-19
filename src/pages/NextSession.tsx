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
import { Menu, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen flex bg-gradient-to-br from-[#111] to-[#1A1A1A] relative overflow-hidden" dir="rtl">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4CD6B4]/5 via-transparent to-transparent animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#4CD6B4]/10 via-transparent to-transparent blur-3xl" />
      
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out relative z-10",
        isMobile ? 'px-2 sm:px-4' : 'pr-64'
      )}>
        <div className="p-3 md:p-8 max-w-7xl mx-auto space-y-4 md:space-y-6 animate-fade-in">
          {isMobile && (
            <Button
              variant="ghost"
              className="text-white self-start p-2 rounded-lg mb-2 hover:bg-white/10 transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          {/* Header Section */}
          <div className="relative overflow-hidden rounded-xl md:rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4CD6B4]/20 to-transparent opacity-50" />
            <div className="relative bg-black/40 p-4 md:p-8 lg:p-12 rounded-xl md:rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="p-2 md:p-3 bg-[#4CD6B4]/20 rounded-lg md:rounded-xl">
                  <CalendarIcon className="w-6 h-6 md:w-8 md:h-8 text-[#4CD6B4]" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3 gradient-text">الجلسات القادمة</h1>
                  <p className="text-sm md:text-base lg:text-lg text-gray-400">عرض وإدارة مواعيد الجلسات القادمة</p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Controls */}
          <div className="bg-black/40 p-3 md:p-6 rounded-xl md:rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
            <CalendarHeader 
              startDate={startDate}
              onNavigateWeek={handleNavigateWeek}
            />
          </div>

          {/* Calendar Grid */}
          <div className="bg-black/40 p-3 md:p-6 rounded-xl md:rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
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
