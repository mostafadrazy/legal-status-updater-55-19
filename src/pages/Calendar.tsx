import { useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarView } from "@/components/calendar/CalendarView";
import { SessionsList } from "@/components/calendar/SessionsList";
import { SessionDialog } from "@/components/calendar/SessionDialog";

interface Session {
  id: string;
  session_date: string;
  next_session_date: string | null;
  room_number: string | null;
  procedure_type: string | null;
  case: {
    id: string;
    title: string;
    case_number: string;
    status: string;
    client: string;
  };
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { session: authSession } = useAuth();
  const isMobile = useIsMobile();

  const { data: sessions } = useQuery({
    queryKey: ['calendar-sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('case_sessions')
        .select(`
          id,
          session_date,
          next_session_date,
          room_number,
          procedure_type,
          case:cases(id, title, case_number, status, client)
        `)
        .eq('user_id', authSession?.user?.id);
      
      if (error) throw error;
      return data as Session[];
    },
    enabled: !!authSession?.user?.id
  });

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-[#111] to-[#1A1A1A]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
      </div>

      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar 
        className={`fixed transition-transform duration-300 ${
          isMobile ? (isSidebarOpen ? 'translate-x-0' : 'translate-x-full') : ''
        }`}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className={`flex-1 transition-all duration-300 ${isMobile ? 'w-full' : 'lg:pr-64'} relative`}>
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <CalendarHeader
            onMenuClick={() => setIsSidebarOpen(true)}
            isMobile={isMobile}
          />

          <Card className="p-6 bg-white/5 border-white/10">
            <CalendarView
              sessions={sessions}
              date={date}
              setDate={setDate}
              onSessionClick={setSelectedSession}
            />

            <SessionsList
              sessions={sessions}
              selectedDate={date}
              onSessionClick={setSelectedSession}
            />
          </Card>
        </div>
      </main>

      <SessionDialog
        session={selectedSession}
        onClose={() => setSelectedSession(null)}
      />
    </div>
  );
}