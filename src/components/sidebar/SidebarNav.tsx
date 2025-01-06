import { Home, Settings, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const menuItems = [
  { icon: Home, labelKey: "home", path: "/" },
  { icon: Folder, labelKey: "cases", path: "/cases" },
  { icon: Settings, labelKey: "settings", path: "/settings" },
];

export function SidebarNav() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <nav className="mt-8 flex-1">
      {menuItems.map((item) => (
        <Link
          key={item.labelKey}
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
          <span>{t(item.labelKey)}</span>
        </Link>
      ))}
    </nav>
  );
}