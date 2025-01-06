import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function CaseTrackingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#8E9196]/10 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:text-[#4CD6B4] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
          <span>العودة</span>
        </Link>
        
        <div className="flex items-center">
          <img
            src="/lovable-uploads/91fe343d-4b53-4607-89d9-af0070a4f130.png"
            alt="Logo"
            className="h-8 object-contain"
          />
        </div>
      </div>
    </nav>
  );
}