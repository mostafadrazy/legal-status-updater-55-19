import { Home, Settings, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "الرئيسية", active: true },
  { icon: Folder, label: "القضايا" },
  { icon: Settings, label: "الإعدادات" },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#222] border-l border-gray-800 p-4 flex flex-col">
      <div className="flex items-center gap-2 px-2 py-4">
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
          <span className="text-black font-bold">ح</span>
        </div>
        <span className="text-white font-semibold">مكتب المحاماة</span>
      </div>
      
      <nav className="mt-8 flex-1">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors",
              item.active && "text-white bg-gray-800"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-3 px-3 py-3">
        <div className="w-8 h-8 rounded-full bg-gray-700" />
        <div className="flex flex-col">
          <span className="text-sm text-white">أحمد محمد</span>
          <span className="text-xs text-gray-400">محامي</span>
        </div>
      </div>
    </aside>
  );
}