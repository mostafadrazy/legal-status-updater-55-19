import { useState, useEffect } from 'react';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";

interface Session {
  id: string;
  session_date: string;
  next_session_date: string | null;
  room_number: string | null;
  procedure_type: string | null;
  case: {
    title: string;
    case_number: string;
  };
}

interface DayProps {
  date: Date;
  children?: React.ReactNode;
}

export function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { session: authSession } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);

  const { data: initialSessions } = useQuery({
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
          case:cases(title, case_number)
        `)
        .eq('user_id', authSession?.user?.id);
      
      if (error) throw error;
      return data as Session[];
    },
    enabled: !!authSession?.user?.id
  });

  useEffect(() => {
    if (!authSession?.user?.id) return;

    const channel = supabase
      .channel('calendar-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'case_sessions',
          filter: `user_id=eq.${authSession.user.id}`
        },
        (payload) => {
          console.log('Real-time update:', payload);
          setSessions(prev => {
            if (payload.eventType === 'INSERT') {
              return [...prev, payload.new as Session];
            }
            if (payload.eventType === 'DELETE') {
              return prev.filter(session => session.id !== payload.old.id);
            }
            if (payload.eventType === 'UPDATE') {
              return prev.map(session => 
                session.id === payload.new.id ? { ...session, ...payload.new } : session
              );
            }
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [authSession?.user?.id]);

  useEffect(() => {
    if (initialSessions) {
      setSessions(initialSessions);
    }
  }, [initialSessions]);

  const getDayContent = (day: Date) => {
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
          className="w-full rounded-none rounded-b-sm bg-[#4CD6B4]/20 text-[#4CD6B4] hover:bg-[#4CD6B4]/30"
        >
          {dayEvents.length}
        </Badge>
      </div>
    );
  };

  return (
    <Card className="p-4 bg-white/5 border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <CalendarIcon className="w-5 h-5 text-[#4CD6B4]" />
        <h3 className="text-lg font-medium text-white">التقويم</h3>
      </div>
      
      <CalendarComponent
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={ar}
        showOutsideDays={true}
        className="rounded-md border border-white/10"
        components={{
          Day: ({ date: dayDate, children }: DayProps) => (
            <div className="relative h-9 w-9">
              {children}
              {getDayContent(dayDate)}
            </div>
          ),
        }}
      />

      {date && (
        <div className="mt-4 space-y-2">
          {sessions
            .filter(session => 
              format(new Date(session.session_date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') ||
              (session.next_session_date && format(new Date(session.next_session_date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
            )
            .map((session) => (
              <div 
                key={session.id}
                className="p-2 rounded bg-white/5 border border-white/10 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">
                    {session.case.title}
                  </span>
                  <Badge variant="outline" className="text-[#4CD6B4] border-[#4CD6B4]">
                    {session.case.case_number}
                  </Badge>
                </div>
                {session.procedure_type && (
                  <p className="text-sm text-gray-400">
                    {session.procedure_type}
                  </p>
                )}
                {session.room_number && (
                  <p className="text-sm text-gray-400">
                    قاعة: {session.room_number}
                  </p>
                )}
              </div>
            ))}
        </div>
      )}
    </Card>
  );
}