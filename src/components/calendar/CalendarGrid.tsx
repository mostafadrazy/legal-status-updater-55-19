import { format, addDays, isSameDay, parseISO } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarEvent } from "./CalendarEvent";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

interface Session {
  id: string;
  title: string | null;
  start_time: string | null;
  end_time: string | null;
  session_date: string;
  next_session_date: string;
  case_id: string;
  procedure_type: string | null;
  room_number: string | null;
  participants?: number | null;
  cases?: {
    client: string;
    court?: string | null;
    case_type?: string | null;
  };
  court?: string | null;
  case_type?: string | null;
}

interface CalendarGridProps {
  sessions: Session[];
  isLoading: boolean;
  startDate: Date;
}

export function CalendarGrid({ sessions, isLoading, startDate }: CalendarGridProps) {
  const isMobile = useIsMobile();
  const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const getSessionsForDay = (date: Date) => {
    return sessions.filter(session => {
      const sessionDate = new Date(session.next_session_date);
      return isSameDay(sessionDate, date);
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-3 md:space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 md:h-20 w-full bg-white/5" />
        ))}
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 md:py-12">
        <p className="text-gray-400">لا توجد جلسات في هذا الأسبوع</p>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="space-y-4">
        {days.map(day => {
          const daySessions = getSessionsForDay(day);
          if (daySessions.length === 0) return null;

          return (
            <div key={day.toISOString()} className="space-y-3">
              <div className="text-sm text-gray-400">
                <div className="font-medium">
                  {format(day, 'EEEE', { locale: ar })}
                </div>
                <div className="text-xs mt-1">
                  {format(day, 'd MMM', { locale: ar })}
                </div>
              </div>
              
              <div className="space-y-2">
                {daySessions.map(session => (
                  <CalendarEvent
                    key={session.id}
                    client={session.cases?.client || 'عميل غير معروف'}
                    court={session.court || 'غير محدد'}
                    caseType={session.case_type || 'غير محدد'}
                    type={session.procedure_type ? 'consultation' : 'default'}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7 gap-4">
      {days.map(day => (
        <div key={day.toISOString()} className="space-y-4">
          <div className="text-sm text-gray-400 text-center">
            <div className="font-medium">
              {format(day, 'EEEE', { locale: ar })}
            </div>
            <div className="text-xs mt-1">
              {format(day, 'd MMM', { locale: ar })}
            </div>
          </div>
          
          <div className="space-y-2">
            {getSessionsForDay(day).map(session => (
              <CalendarEvent
                key={session.id}
                client={session.cases?.client || 'عميل غير معروف'}
                court={session.court || 'غير محدد'}
                caseType={session.case_type || 'غير محدد'}
                type={session.procedure_type ? 'consultation' : 'default'}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}