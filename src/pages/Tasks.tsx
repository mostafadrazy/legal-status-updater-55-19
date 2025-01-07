import { useState, useEffect } from "react";
import { ListCheck } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarControls } from "@/components/calendar/CalendarControls";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { addDays, startOfWeek, parseISO } from "date-fns";
import { format } from "date-fns";

export default function Tasks() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("weekly");
  const [currentDate, setCurrentDate] = useState(new Date());
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const { session } = useAuth();

  // Fetch only the next upcoming session for each case
  const { data: sessions = [], isLoading } = useQuery({
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
            cases!inner (
              id,
              user_id,
              client,
              title
            )
          `)
          .eq('cases.user_id', session.user.id)
          .gte('session_date', format(new Date(), 'yyyy-MM-dd'))
          .order('session_date', { ascending: true })
          .limit(1);
        
        if (error) {
          console.error('Error fetching sessions:', error);
          toast.error('فشل في تحميل الجلسات');
          throw error;
        }
        
        return data?.map(session => ({
          ...session,
          title: session.cases.client, // Use client name as title
        })) || [];
      } catch (error) {
        console.error('Error fetching sessions:', error);
        toast.error('فشل في تحميل الجلسات');
        throw error;
      }
    },
    enabled: !!session?.user?.id
  });

  // Update currentDate when sessions data is loaded
  useEffect(() => {
    if (sessions && sessions.length > 0) {
      const nextSessionDate = parseISO(sessions[0].session_date);
      // Find the start of the week containing the next session
      const weekStart = startOfWeek(nextSessionDate, { weekStartsOn: 0 });
      setCurrentDate(weekStart);
    }
  }, [sessions]);

  // Calculate the start date for the current week
  const startDate = currentDate;
  const endDate = addDays(startDate, 6);

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      if (direction === 'prev') {
        return addDays(prev, -7);
      }
      return addDays(prev, 7);
    });
  };

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
              <ListCheck className="h-6 w-6" />
            </Button>
          )}

          {/* Header Section */}
          <div className="glass-card p-6 rounded-xl mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">الجلسة القادمة</h1>
                <CalendarHeader startDate={startDate} onNavigateWeek={navigateWeek} />
              </div>
            </div>

            {/* Calendar Controls */}
            <CalendarControls activeView={activeView} onViewChange={setActiveView} />
          </div>

          {/* Calendar Grid */}
          <div className="glass-card p-6 rounded-xl">
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