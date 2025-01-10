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
    <div className="min-h-screen flex bg-gradient-to-br from-[#111] via-[#1A1A1A] to-[#222] relative" dir="rtl">
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isMobile ? 'px-4' : 'pr-64'
      )}>
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
          {isMobile && (
            <Button
              variant="ghost"
              className="text-white self-start p-2 rounded-lg mb-4 hover:bg-white/10 transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}

          {/* Header Section */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4CD6B4]/20 to-transparent opacity-50" />
            <div className="relative bg-black/40 p-8 md:p-12 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#4CD6B4]/20 rounded-xl">
                  <CalendarIcon className="w-8 h-8 text-[#4CD6B4]" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 gradient-text">الجلسات القادمة</h1>
                  <p className="text-gray-400 text-lg">عرض وإدارة مواعيد الجلسات القادمة</p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Controls */}
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
            <CalendarHeader 
              startDate={startDate}
              onNavigateWeek={handleNavigateWeek}
            />
          </div>

          {/* Calendar Grid */}
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
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