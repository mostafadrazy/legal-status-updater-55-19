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
    return startOfWeek(today, { weekStartsOn: 1 });
  });
  
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const { session } = useAuth();

  const { data: sessions = [], isLoading, error, refetch } = useQuery({
    queryKey: ['next-sessions', session?.user?.id, startDate],
    queryFn: async () => {
      try {
        if (!session?.user?.id) {
          return [];
        }

        const { data, error: fetchError } = await supabase
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

        if (fetchError) throw fetchError;
        
        return data?.map(session => ({
          ...session,
          court: session.cases?.court,
          case_type: session.cases?.case_type,
          client: session.cases?.client
        })) || [];
      } catch (error) {
        console.error('Error in query function:', error);
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
    <div className="min-h-screen flex bg-gradient-to-br from-[#111] to-[#1A1A1A]" dir="rtl">
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isMobile ? "w-full" : "pr-64"
      )}>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            {isMobile && (
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4CD6B4]/20 to-transparent opacity-50" />
              <div className="relative bg-black/40 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#4CD6B4]/20 rounded-xl">
                    <CalendarIcon className="w-6 h-6 text-[#4CD6B4]" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2 gradient-text">الجلسات القادمة</h1>
                    <p className="text-gray-400">عرض وإدارة مواعيد الجلسات القادمة</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Controls */}
            <div className="bg-black/40 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              <CalendarHeader 
                startDate={startDate}
                onNavigateWeek={handleNavigateWeek}
              />
            </div>

            {/* Calendar Grid */}
            <div className="bg-black/40 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              <CalendarGrid
                sessions={sessions}
                isLoading={isLoading}
                startDate={startDate}
                error={error as Error}
                onRetry={() => refetch()}
              />
            </div>
          </div>
        </div>
      </main>
      
      {(isSidebarOpen || !isMobile) && (
        <Sidebar 
          onClose={() => setIsSidebarOpen(false)}
          className={cn(
            "transition-transform duration-300",
            !isSidebarOpen && isMobile && "translate-x-full"
          )}
        />
      )}
    </div>
  );
}