import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Backdrop circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#4CD6B4]/5 blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[#4CD6B4]/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in leading-tight">
            أفضل نظام لإدارة
            <span className="block bg-gradient-to-l from-[#4CD6B4] to-[#3BC5A3] bg-clip-text text-transparent">
              الخدمات القانونية
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto animate-fade-in">
            منصة متكاملة لإدارة القضايا القانونية بكفاءة وفعالية، مصممة خصيصاً للمحامين والمكاتب القانونية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black animate-fade-in min-w-[200px]"
              onClick={() => navigate("/auth/login")}
            >
              ابدأ الآن مجاناً
              <ArrowRight className="mr-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#4CD6B4] text-[#4CD6B4] hover:bg-[#4CD6B4]/10 animate-fade-in min-w-[200px]"
            >
              تواصل معنا
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;