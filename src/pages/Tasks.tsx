import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SearchSection } from "@/components/dashboard/SearchSection";

const Tasks = () => {
  const { session } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-[#111] to-[#1A1A1A]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
      </div>

      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar 
        className={`fixed transition-transform duration-300 ${
          isMobile ? (isSidebarOpen ? 'translate-x-0' : 'translate-x-full') : ''
        }`}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className={`flex-1 transition-all duration-300 ${isMobile ? 'w-full' : 'lg:pr-64'} relative`}>
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <DashboardHeader
            onNewCase={() => {}} // Placeholder for task creation
            onMenuClick={() => setIsSidebarOpen(true)}
            isMobile={isMobile}
          />

          <SearchSection
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="mt-8 text-center text-gray-400">
            قريباً - المهام قيد التطوير
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tasks;