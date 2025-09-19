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
      "fixed top-0 right-0 z-40 w-72 md:w-64 h-screen transition-transform backdrop-blur-xl bg-black/20 border-l border-white/10",
      className
    )}>
      <div className="h-full flex flex-col">
        <div className="flex-shrink-0">
          <div className="flex justify-between items-center p-4">
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-[#4CD6B4] transition-all duration-300 md:hidden glass-card rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="flex justify-center mb-6">
            <SidebarLogo />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-3">
          <SidebarNav />
        </div>
        
        <div className="flex-shrink-0 border-t border-white/10 mt-auto">
          <SidebarProfile />
        </div>
      </div>
    </aside>
  );
};