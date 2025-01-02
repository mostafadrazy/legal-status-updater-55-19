import React from 'react';
import { Scale, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  return (
    <nav className="fixed w-full z-50 backdrop-blur-lg bg-black/20 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate("/")}>
            <Scale className="w-6 h-6 text-[#4CD6B4] group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
              نظام إدارة القضايا
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => scrollToSection('features')}
            >
              المميزات
            </Button>
            <Button 
              variant="ghost" 
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => scrollToSection('services')}
            >
              الخدمات
            </Button>
            <Button 
              variant="ghost"
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => navigate("/case-tracking")}
            >
              <Search className="w-4 h-4 ml-2" />
              تتبع القضية
            </Button>
            <Button 
              className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black font-medium px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate("/auth/login")}
            >
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;