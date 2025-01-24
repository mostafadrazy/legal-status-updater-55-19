import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { LandingContent } from "@/components/landing/LandingContent";
import NewCaseForm from "@/components/NewCaseForm";
import { Sidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SearchSection } from "@/components/dashboard/SearchSection";
import { Button } from "@/components/ui/button";
import { Menu, Plus } from "lucide-react";

const Index = () => {
  const { session } = useAuth();
  const [isNewCaseDialogOpen, setIsNewCaseDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!session) {
    return <LandingContent />;
  }

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-[#111] to-[#1A1A1A] overflow-x-hidden">
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

      <main className={`flex-1 ${isMobile ? 'px-4 pb-safe' : 'pr-64'} overflow-auto relative z-10`}>
        <div className="p-4 md:p-8 max-w-7xl mx-auto safe-area-inset-bottom">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="glass-button mb-4 !p-3 !min-w-0"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div className="w-full md:w-auto">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
                القضايا الحديثة
              </h1>
            </div>
            <Button 
              className="glass-button w-full md:w-auto"
              onClick={() => setIsNewCaseDialogOpen(true)}
            >
              <Plus className="w-5 h-5 ml-2" />
              إنشاء قضية
            </Button>
          </div>

          <div className="safe-area-inset-left safe-area-inset-right">
            <SearchSection 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery} 
            />
            <DashboardContent />
          </div>
        </div>
      </main>
      
      {(isSidebarOpen || !isMobile) && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
      
      <NewCaseForm 
        open={isNewCaseDialogOpen} 
        onOpenChange={setIsNewCaseDialogOpen}
      />
    </div>
  );
};

export default Index;