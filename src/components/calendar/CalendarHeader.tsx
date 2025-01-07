import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";
import { ar } from "date-fns/locale";

interface CalendarHeaderProps {
  startDate: Date;
  onNavigateWeek: (direction: 'prev' | 'next') => void;
}

export function CalendarHeader({ startDate, onNavigateWeek }: CalendarHeaderProps) {
  const endDate = addDays(startDate, 6);
  const formattedDateRange = `${format(startDate, 'd', { locale: ar })} - ${format(endDate, 'd MMMM yyyy', { locale: ar })}`;

  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => onNavigateWeek('prev')}
        className="hover:bg-white/10"
      >
        <ChevronRight className="h-4 w-4 text-gray-400" />
      </Button>
      <p className="text-gray-400">{formattedDateRange}</p>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => onNavigateWeek('next')}
        className="hover:bg-white/10"
      >
        <ChevronLeft className="h-4 w-4 text-gray-400" />
      </Button>
    </div>
  );
}