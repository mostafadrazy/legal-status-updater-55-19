import React from 'react';
import { SidebarNav } from './sidebar/SidebarNav';
import { SidebarProfile } from './sidebar/SidebarProfile';
import { SidebarLogo } from './sidebar/SidebarLogo';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className, onClose }) => {
  return (
    <aside className={cn(
      "fixed top-0 right-0 z-40 w-64 h-screen transition-transform bg-[#1A1A1A] border-l border-white/10",
      className
    )}>
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="flex justify-between items-center">
          <SidebarLogo />
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white md:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <SidebarNav />
        <SidebarProfile />
      </div>
    </aside>
  );
};