import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CaseTracking = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111] to-[#1A1A1A] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">تتبع قضيتك</h2>
          <p className="text-gray-400">أدخل رقم القضية للاطلاع على آخر المستجدات</p>
        </div>
        
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="رقم القضية"
            className="text-right"
          />
          <Button className="w-full bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black">
            تتبع
          </Button>
        </div>
        
        <Button
          variant="ghost"
          className="w-full text-white/80 hover:text-white"
          onClick={() => navigate("/")}
        >
          <ArrowRight className="ml-2 h-4 w-4" />
          العودة للرئيسية
        </Button>
      </div>
    </div>
  );
};

export default CaseTracking;