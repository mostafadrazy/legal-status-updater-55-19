import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function SidebarProfile() {
  const { signOut } = useAuth();

  return (
    <div className="mt-auto">
      <div className="flex items-center gap-3 px-3 py-3">
        <div className="w-8 h-8 rounded-full bg-gray-700/50 backdrop-blur-sm" />
        <div className="flex flex-col">
          <span className="text-sm text-white">أحمد محمد</span>
          <span className="text-xs text-[#4CD6B4]">محامي</span>
        </div>
      </div>
      <button
        onClick={signOut}
        className="w-full flex items-center gap-3 px-3 py-2 mt-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-800/50 transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md"
      >
        <LogOut className="w-5 h-5" />
        <span>تسجيل الخروج</span>
      </button>
    </div>
  );
}