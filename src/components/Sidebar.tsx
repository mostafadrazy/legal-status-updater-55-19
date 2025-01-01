import { Home, MessageSquare, Phone, ClipboardList, Users, BarChart2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: MessageSquare, label: "Messages" },
  { icon: Phone, label: "Calls" },
  { icon: ClipboardList, label: "Tasks" },
  { icon: Users, label: "Contacts" },
  { icon: BarChart2, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-[#222] border-r border-gray-800 p-4 flex flex-col">
      <div className="flex items-center gap-2 px-2 py-4">
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
          <span className="text-black font-bold">H</span>
        </div>
        <span className="text-white font-semibold">Halal Law</span>
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
          <span className="text-sm text-white">John Doe</span>
          <span className="text-xs text-gray-400">Attorney</span>
        </div>
      </div>
    </div>
  );
}