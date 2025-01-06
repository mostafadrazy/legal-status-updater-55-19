import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

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

interface SessionsListProps {
  sessions: Session[] | undefined;
  selectedDate: Date | undefined;
  onSessionClick: (session: Session) => void;
}

export function SessionsList({ sessions, selectedDate, onSessionClick }: SessionsListProps) {
  if (!selectedDate || !sessions) return null;

  const dayEvents = sessions.filter(session => 
    format(new Date(session.session_date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ||
    (session.next_session_date && format(new Date(session.next_session_date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
  );

  if (dayEvents.length === 0) return null;

  return (
    <div className="mt-6 space-y-3">
      {dayEvents.map((session) => (
        <div 
          key={session.id}
          className="glass-card p-4 rounded-lg cursor-pointer"
          onClick={() => onSessionClick(session)}
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
  );
}