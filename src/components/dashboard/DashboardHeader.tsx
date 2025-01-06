import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface DashboardHeaderProps {
  onNewCase: () => void;
  onMenuClick: () => void;
  isMobile: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onNewCase,
  onMenuClick,
  isMobile
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {isMobile && (
          <Button
            variant="ghost"
            className="glass-button text-white self-start p-2 rounded-lg backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
            onClick={onMenuClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </Button>
        )}
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
          القضايا الحديثة
        </h1>
        <Button 
          className="glass-button text-black font-medium px-6 py-2 rounded-lg backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 w-full md:w-auto"
          onClick={onNewCase}
        >
          <Plus className="w-4 h-4 ml-2" />
          إنشاء قضية
        </Button>
      </div>
    </div>
  );
};