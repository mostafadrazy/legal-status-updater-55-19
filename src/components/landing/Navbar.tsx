import React from 'react';
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="fixed w-full z-50 backdrop-blur-lg bg-black/20 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 group">
            <Scale className="w-6 h-6 text-[#4CD6B4] group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
              نظام إدارة القضايا
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Button 
              variant="ghost" 
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              المميزات
            </Button>
            <Button 
              variant="ghost" 
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              الخدمات
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