import { format, addDays, startOfDay, isAfter, isSameDay } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarEvent } from "./CalendarEvent";
import { Skeleton } from "@/components/ui/skeleton";

interface Session {
  id: string;
  title: string | null;
  start_time: string | null;
  end_time: string | null;
  session_date: string;
  case_id: string;
  procedure_type: string | null;
  room_number: string | null;
  participants?: number | null;
}

interface CalendarGridProps {
  sessions: Session[];
  isLoading: boolean;
}

export function CalendarGrid({ sessions, isLoading }: CalendarGridProps) {
  // Get next 7 days
  const days = Array.from({ length: 7 }, (_, i) => addDays(startOfDay(new Date()), i));

  const getSessionsForDay = (date: Date) => {
    return sessions.filter(session => {
      const sessionDate = new Date(session.session_date);
      return isSameDay(sessionDate, date);
    });
  };

  // Filter out past sessions
  const today = startOfDay(new Date());
  const upcomingSessions = sessions.filter(session => {
    const sessionDate = new Date(session.session_date);
    return isAfter(sessionDate, today) || isSameDay(sessionDate, today);
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full bg-white/5" />
        ))}
      </div>
    );
  }

  if (upcomingSessions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">لا توجد جلسات قادمة</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[120px_1fr] gap-4">
      {/* Day labels */}
      <div className="space-y-8">
        {days.map(day => (
          <div key={day.toISOString()} className="text-sm text-gray-400 text-center">
            {format(day, 'EEEE', { locale: ar })}
            <div className="text-xs mt-1">
              {format(day, 'd MMM', { locale: ar })}
            </div>
          </div>
        ))}
      </div>

      {/* Events grid */}
      <div className="space-y-4">
        {days.map(day => {
          const daySessions = getSessionsForDay(day);
          return (
            <div key={day.toISOString()} className="min-h-[80px] border-b border-white/5">
              {daySessions.map(session => (
                <CalendarEvent
                  key={session.id}
                  title={session.title || session.procedure_type || 'جلسة غير معنونة'}
                  startTime={session.start_time ? 
                    format(new Date(session.start_time), 'HH:mm', { locale: ar }) : 
                    '09:00'}
                  endTime={session.end_time ? 
                    format(new Date(session.end_time), 'HH:mm', { locale: ar }) : 
                    '10:00'}
                  type={session.procedure_type ? 'consultation' : 'default'}
                  participants={session.participants || undefined}
                  roomNumber={session.room_number}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}