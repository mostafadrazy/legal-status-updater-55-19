import { Home, Settings, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "الرئيسية", path: "/" },
  { icon: Folder, label: "القضايا", path: "/case-tracking" },
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
            "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors",
            location.pathname === item.path && "text-white bg-gray-800"
          )}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}