import React from 'react';
import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-12">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-[#4CD6B4] to-[#2C9A82] p-4 rounded-2xl">
              <Scale className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in">
            نظام متكامل
            <span className="block bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
              لإدارة القضايا القانونية
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in">
            منصة احترافية تساعد المحامين على إدارة القضايا وتنظيم الملفات ومتابعة المواعيد مع توفير بوابة آمنة للعملاء
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button 
              className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black font-medium px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 min-w-[200px]"
            >
              ابدأ الآن مجاناً
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;