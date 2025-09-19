import { LegalAssistant as Assistant } from "@/components/legal-assistant/LegalAssistant";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";

export default function LegalAssistantPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-[#0a0a0a]">
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
      <main className="flex-1 flex flex-col h-[100dvh] lg:pr-64">
        {/* Mobile header */}
        <div className="lg:hidden flex-shrink-0 px-4 py-4 border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <button
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={handleMenuClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            
            <h1 className="text-xl font-bold text-center bg-gradient-to-r from-[#4CD6B4] to-[#34D399] bg-clip-text text-transparent">
              المستشار القانوني
            </h1>
            
            <div className="w-10"></div>
          </div>
        </div>

        <div className="flex-1 min-h-0">
          <Assistant />
        </div>
      </main>
    </div>
  );
}