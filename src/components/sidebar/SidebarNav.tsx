import { Home, Settings, Folder, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "الرئيسية", path: "/" },
  { icon: Folder, label: "القضايا", path: "/cases" },
  { icon: Calendar, label: "التقويم", path: "/calendar" },
  { icon: Settings, label: "الإعدادات", path: "/settings" },
];

export function SidebarNav() {
  const location = useLocation();

  return (
    <nav className="mt-8 flex-1">
      {menuItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-[#4CD6B4] hover:bg-white/5 transition-all duration-300",
            "backdrop-blur-sm hover:backdrop-blur-md",
            location.pathname === item.path && "text-[#4CD6B4] bg-white/5 shadow-sm"
          )}
        >
          <item.icon className={cn(
            "w-5 h-5 transition-colors",
            location.pathname === item.path ? "text-[#4CD6B4]" : "text-gray-400"
          )} />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}