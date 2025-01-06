import { SidebarLogo } from "./sidebar/SidebarLogo";
import { SidebarNav } from "./sidebar/SidebarNav";
import { SidebarProfile } from "./sidebar/SidebarProfile";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-[#4CD6B4]/20 backdrop-blur-sm border border-white/10 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 h-screen glass-card border-r border-white/10 p-4 flex flex-col shadow-xl transition-all duration-300 z-40
        ${isOpen ? 'w-64 translate-x-0' : 'w-64 translate-x-full lg:translate-x-0'}`}>
        <SidebarLogo />
        <SidebarNav />
        <SidebarProfile />
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}