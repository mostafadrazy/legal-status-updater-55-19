import React from 'react';
import { SidebarNav } from './sidebar/SidebarNav';
import { SidebarProfile } from './sidebar/SidebarProfile';
import { SidebarLogo } from './sidebar/SidebarLogo';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  return (
    <aside className="fixed top-0 right-0 z-40 w-64 h-screen transition-transform bg-[#1A1A1A] border-l border-white/10">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <SidebarLogo />
        <SidebarNav />
        <SidebarProfile />
      </div>
    </aside>
  );
};