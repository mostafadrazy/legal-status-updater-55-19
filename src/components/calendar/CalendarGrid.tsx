import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarEvent } from "./CalendarEvent";

interface Session {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  session_date: string;
  case_id: string;
  procedure_type: string | null;
  room_number: string | null;
  participants?: number;
}

interface CalendarGridProps {
  sessions: Session[];
  isLoading: boolean;
}

export function CalendarGrid({ sessions, isLoading }: CalendarGridProps) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

  const getSessionsForHour = (hour: number) => {
    return sessions.filter(session => {
      const sessionHour = new Date(session.start_time).getHours();
      return sessionHour === hour;
    });
  };

  if (isLoading) {
    return <div className="text-white/70 text-center py-8">جاري التحميل...</div>;
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
                  title={session.title}
                  startTime={format(new Date(session.start_time), 'HH:mm', { locale: ar })}
                  endTime={format(new Date(session.end_time), 'HH:mm', { locale: ar })}
                  type={session.procedure_type as any || 'default'}
                  participants={session.participants}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}