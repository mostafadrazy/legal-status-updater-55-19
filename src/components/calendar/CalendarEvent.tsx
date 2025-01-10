import { cn } from "@/lib/utils";
import { MapPin, Clock, Users } from "lucide-react";
import { AvatarGroup } from "@/components/ui/avatar-group";

interface CalendarEventProps {
  client: string;
  court?: string | null;
  caseType?: string | null;
  type?: 'default' | 'consultation' | 'project' | 'feedback';
}

export function CalendarEvent({ 
  client,
  court,
  caseType,
  type = 'default'
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

  const iconColorVariants = {
    default: "text-[#4CD6B4]",
    consultation: "text-blue-300",
    project: "text-emerald-300",
    feedback: "text-orange-300"
  };

  return (
    <div 
      className={cn(
        "rounded-xl p-4 border backdrop-blur-sm",
        colorVariants[type],
        "hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-lg",
        "animate-fade-in"
      )}
    >
      <div className="flex flex-col gap-3">
        <h4 className={cn(
          "font-medium text-sm",
          textColorVariants[type],
          "flex items-center gap-2"
        )}>
          <Users className={cn("w-4 h-4", iconColorVariants[type])} />
          {client}
        </h4>
        <div className="space-y-2">
          {court && (
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <MapPin className={cn("w-3 h-3", iconColorVariants[type])} />
              {court}
            </p>
          )}
          {caseType && (
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <Clock className={cn("w-3 h-3", iconColorVariants[type])} />
              {caseType}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}