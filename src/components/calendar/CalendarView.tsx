import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
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

interface CalendarViewProps {
  sessions: Session[] | undefined;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onSessionClick: (session: Session) => void;
}

interface CustomDayProps extends DayContentProps {
  date: Date;
  displayMonth: Date;
}

export function CalendarView({ sessions, date, setDate, onSessionClick }: CalendarViewProps) {
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
            onSessionClick(dayEvents[0]);
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
  );
}