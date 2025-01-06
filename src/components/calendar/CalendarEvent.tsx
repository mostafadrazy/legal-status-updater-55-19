import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface CalendarEventProps {
  title: string;
  startTime: string;
  endTime: string;
  type?: 'default' | 'consultation' | 'project' | 'feedback';
  participants?: number;
  roomNumber?: string | null;
}

export function CalendarEvent({ 
  title, 
  startTime, 
  endTime, 
  type = 'default', 
  participants,
  roomNumber 
}: CalendarEventProps) {
  const colorVariants = {
    default: "bg-gray-100/10 border-white/10",
    consultation: "bg-blue-100/10 border-blue-200/20",
    project: "bg-green-100/10 border-green-200/20",
    feedback: "bg-orange-100/10 border-orange-200/20"
  };

  const textColorVariants = {
    default: "text-white",
    consultation: "text-blue-200",
    project: "text-green-200",
    feedback: "text-orange-200"
  };

  return (
    <div 
      className={cn(
        "rounded-lg p-3 border",
        colorVariants[type],
        "hover:scale-[1.02] transition-transform"
      )}
    >
      <h4 className={cn("font-medium mb-1", textColorVariants[type])}>{title}</h4>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-400">
          {startTime} - {endTime}
        </p>
        <div className="flex items-center justify-between">
          {roomNumber && (
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>قاعة {roomNumber}</span>
            </div>
          )}
          {participants && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-400">+{participants}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}