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
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 553.61 286.91" 
              className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
            >
              <path className="fill-[#4CD6B4]" d="M227.69,29.22h31.12c-4.18,13.82-9.18,27.52-13.95,41.16l-1.65,4.39-24.2-.12c2.02-15.18,6.22-30.26,8.68-45.43Z"/>
              <path className="fill-[#4CD6B4]" d="M94.43,29.11c10.46-.12,20.93-.11,31.39.03,2.13,15.24,6.74,30.07,8.56,45.34l-24.59.12c-4.76-15.27-10.12-30.38-15.36-45.49Z"/>
              <path className="fill-[#4CD6B4]" d="M138.96,189.16h75.2c-6.22,5.44-12.32,11.04-18.47,16.56-6.4,5.93-12.86,11.79-19.37,17.59-13.16-10.47-25.29-22.46-37.36-34.15Z"/>
            </svg>
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