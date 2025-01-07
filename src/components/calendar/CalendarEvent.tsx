import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
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

  return (
    <div 
      className={cn(
        "rounded-lg p-3 border backdrop-blur-sm",
        colorVariants[type],
        "hover:scale-[1.02] transition-all duration-200 cursor-pointer"
      )}
    >
      <div className="flex flex-col gap-2">
        <h4 className={cn("font-medium text-sm", textColorVariants[type])}>
          {client}
        </h4>
        <div className="space-y-1">
          <p className="text-xs text-gray-400">
            المحكمة: {court}
          </p>
          <p className="text-xs text-gray-400">
            نوع القضية: {caseType}
          </p>
        </div>
      </div>
    </div>
  );
}