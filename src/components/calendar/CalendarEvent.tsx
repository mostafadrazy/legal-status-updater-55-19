import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { AvatarGroup } from "@/components/ui/avatar-group";

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
    default: "bg-gray-100/10 border-white/10 hover:bg-gray-100/20",
    consultation: "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20",
    project: "bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20",
    feedback: "bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20"
  };

  const textColorVariants = {
    default: "text-white",
    consultation: "text-blue-200",
    project: "text-emerald-200",
    feedback: "text-orange-200"
  };

  // Mock avatars for demonstration
  const mockAvatars = participants ? Array(participants).fill({
    src: "",
    fallback: "U"
  }) : [];

  return (
    <div 
      className={cn(
        "rounded-lg p-3 border backdrop-blur-sm",
        colorVariants[type],
        "hover:scale-[1.02] transition-all duration-200 cursor-pointer"
      )}
    >
      <div className="flex flex-col gap-2">
        <h4 className={cn("font-medium text-sm", textColorVariants[type])}>{title}</h4>
        <p className="text-xs text-gray-400">
          {startTime} - {endTime}
        </p>
        <div className="flex items-center justify-between">
          {roomNumber && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">قاعة {roomNumber}</span>
            </div>
          )}
          {participants && participants > 0 && (
            <AvatarGroup
              avatars={mockAvatars}
              max={3}
              className="scale-75 origin-right"
            />
          )}
        </div>
      </div>
    </div>
  );
}