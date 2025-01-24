import { LegalAssistant as Assistant } from "@/components/legal-assistant/LegalAssistant";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";

export default function LegalAssistantPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-gradient-to-br from-[#111] to-[#1A1A1A]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#34D399]/10 to-transparent rounded-full blur-3xl opacity-10" />
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className="lg:hidden">
        {isSidebarOpen && (
          <Sidebar onClose={() => setIsSidebarOpen(false)} className="translate-x-0" />
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-[100dvh] lg:pr-64 safe-area-inset-top safe-area-inset-bottom">
        <div className="flex-shrink-0 px-2 sm:px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-white hover:bg-[#4CD6B4]/20 rounded-lg transition-colors"
              onClick={handleMenuClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center bg-gradient-to-r from-[#4CD6B4] to-[#34D399] bg-clip-text text-transparent">
              المستشار القانوني
            </h1>
            
            {/* Empty div to maintain centering */}
            <div className="w-10 lg:hidden"></div>
          </div>
        </div>

        <div className="flex-1 min-h-0 px-2 sm:px-4 lg:px-8 pb-4">
          <Assistant />
        </div>
      </main>
    </div>
  );
}