import { format } from "date-fns";
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
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

  const getSessionsForHour = (hour: number) => {
    return sessions.filter(session => {
      // Default to 9 AM if no start time is provided
      const sessionStartTime = session.start_time ? new Date(session.start_time) : new Date(session.session_date + 'T09:00:00');
      return sessionStartTime.getHours() === hour;
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full bg-white/5" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[80px_1fr] gap-4">
      {/* Time labels */}
      <div className="space-y-8">
        {hours.map(hour => (
          <div key={hour} className="text-sm text-gray-400 text-center">
            {hour}:00
          </div>
        ))}
      </div>

      {/* Events grid */}
      <div className="space-y-4">
        {hours.map(hour => {
          const hourSessions = getSessionsForHour(hour);
          return (
            <div key={hour} className="min-h-[60px] border-b border-white/5">
              {hourSessions.map(session => (
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