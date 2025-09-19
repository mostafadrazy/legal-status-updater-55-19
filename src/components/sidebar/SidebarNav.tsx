import { Home, Settings, Folder, Bell, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "الرئيسية", path: "/" },
  { icon: Folder, label: "القضايا", path: "/cases" },
  { icon: Bell, label: "الجلسة القادمة", path: "/next-session" },
  { icon: MessageSquare, label: "المستشار القانوني", path: "/legal-assistant" },
  { icon: Settings, label: "الإعدادات", path: "/settings" },
];

export function SidebarNav() {
  const location = useLocation();

  return (
    <nav className="space-y-2">
      {menuItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-300",
            "relative group glass-card",
            location.pathname === item.path ? 
              "text-[#4CD6B4] bg-[#4CD6B4]/20 border-[#4CD6B4]/30 shadow-lg shadow-[#4CD6B4]/10" : 
              "text-white/70 hover:text-[#4CD6B4] hover:bg-white/5 hover:border-[#4CD6B4]/20"
          )}
        >
          <item.icon className={cn(
            "w-5 h-5 transition-all duration-300 flex-shrink-0",
            location.pathname === item.path ? "text-[#4CD6B4]" : "text-white/60 group-hover:text-[#4CD6B4]"
          )} />
          <span className="font-medium truncate">{item.label}</span>
          {location.pathname === item.path && (
            <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-[#4CD6B4] to-[#4CD6B4]/50 rounded-l-full" />
          )}
        </Link>
      ))}
    </nav>
  );
}