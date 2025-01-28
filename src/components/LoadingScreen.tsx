import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#111] to-[#1A1A1A] z-[9999] flex items-center justify-center overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
      
      {/* Loading content */}
      <div className="relative glass-card px-8 py-6 rounded-2xl animate-fade-in">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4CD6B4]/20 to-transparent rounded-full blur-xl animate-pulse" />
            <Loader2 className="h-12 w-12 animate-spin text-[#4CD6B4]" />
          </div>
          <p className="text-lg font-medium text-white/80">جاري التحميل...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;