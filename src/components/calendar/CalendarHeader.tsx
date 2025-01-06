import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface CalendarHeaderProps {
  onMenuClick: () => void;
  isMobile: boolean;
}

export function CalendarHeader({ onMenuClick, isMobile }: CalendarHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        {isMobile && (
          <Button
            variant="ghost"
            className="glass-button text-white self-start p-2 rounded-lg backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
          التقويم
        </h1>
      </div>
    </div>
  );
}