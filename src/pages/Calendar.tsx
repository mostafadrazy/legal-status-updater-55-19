import { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DayContent, DayContentProps } from "react-day-picker";

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

interface CustomDayProps extends DayContentProps {
  date: Date;
  displayMonth: Date;
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

  const getDayContent = (day: Date) => {
    if (!sessions) return null;
    
    const dayStr = format(day, 'yyyy-MM-dd');
    const dayEvents = sessions.filter(
      session => 
        format(new Date(session.session_date), 'yyyy-MM-dd') === dayStr ||
        (session.next_session_date && format(new Date(session.next_session_date), 'yyyy-MM-dd') === dayStr)
    );

    if (dayEvents.length === 0) return null;

    return (
      <div className="absolute bottom-0 right-0 left-0">
        <Badge 
          variant="secondary" 
          className="w-full rounded-none rounded-b-sm bg-[#4CD6B4]/20 text-[#4CD6B4] hover:bg-[#4CD6B4]/30 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedSession(dayEvents[0]);
          }}
        >
          {dayEvents.length}
        </Badge>
      </div>
    );
  };

  const CustomDay = ({ date: dayDate, ...props }: CustomDayProps) => (
    <div className="relative h-9 w-9">
      <DayContent {...props} date={dayDate} />
      {getDayContent(dayDate)}
    </div>
  );

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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-8 h-8 text-[#4CD6B4]" />
              <h1 className="text-2xl font-bold text-white">التقويم</h1>
            </div>
          </div>

          <Card className="p-6 bg-white/5 border-white/10">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ar}
              showOutsideDays={true}
              className="rounded-md border border-white/10"
              components={{
                Day: CustomDay
              }}
            />

            {date && sessions && (
              <div className="mt-6 space-y-3">
                {sessions
                  .filter(session => 
                    format(new Date(session.session_date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') ||
                    (session.next_session_date && format(new Date(session.next_session_date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
                  )
                  .map((session) => (
                    <div 
                      key={session.id}
                      className="glass-card p-4 rounded-lg cursor-pointer"
                      onClick={() => setSelectedSession(session)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">{session.case.title}</h3>
                        <Badge variant="outline" className="text-[#4CD6B4] border-[#4CD6B4]">
                          {session.case.case_number}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-400">
                        <p>العميل: {session.case.client}</p>
                        {session.procedure_type && <p>نوع الجلسة: {session.procedure_type}</p>}
                        {session.room_number && <p>قاعة: {session.room_number}</p>}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </Card>
        </div>
      </main>

      <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
        <DialogContent className="bg-gradient-to-br from-[#111] to-[#1A1A1A] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              تفاصيل الجلسة
            </DialogTitle>
          </DialogHeader>
          
          {selectedSession && (
            <div className="space-y-4">
              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{selectedSession.case.title}</h3>
                  <Badge variant="outline" className="text-[#4CD6B4] border-[#4CD6B4]">
                    {selectedSession.case.case_number}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-gray-400">
                  <p>العميل: {selectedSession.case.client}</p>
                  <p>الحالة: {selectedSession.case.status}</p>
                  {selectedSession.procedure_type && (
                    <p>نوع الجلسة: {selectedSession.procedure_type}</p>
                  )}
                  {selectedSession.room_number && (
                    <p>قاعة: {selectedSession.room_number}</p>
                  )}
                  <p>تاريخ الجلسة: {format(new Date(selectedSession.session_date), 'dd MMMM yyyy', { locale: ar })}</p>
                  {selectedSession.next_session_date && (
                    <p>الجلسة القادمة: {format(new Date(selectedSession.next_session_date), 'dd MMMM yyyy', { locale: ar })}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}