import React from 'react';
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const WhatWeDo = () => {
  const navigate = useNavigate();
  const services = [
    "إدارة القضايا والملفات القانونية",
    "متابعة المواعيد والجلسات",
    "تنظيم وثائق المحكمة",
    "إدارة معلومات العملاء",
    "تتبع حالة القضايا",
    "إنشاء التقارير القانونية",
    "بوابة آمنة للعملاء",
    "البحث المتقدم في القضايا",
    "نظام التنبيهات والتذكيرات",
  ];

  return (
    <section className="py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center container mx-auto">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold gradient-text">
              ماذا نقدم
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              نقدم نظاماً متكاملاً لإدارة القضايا يساعد المحامين على تنظيم عملهم وتتبع قضاياهم بكفاءة عالية، مع توفير واجهة سهلة الاستخدام للعملاء لمتابعة مستجدات قضاياهم.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div 
                key={service}
                className="glass-card flex items-center gap-3 p-4 rounded-lg animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-[#4CD6B4]/20 p-2 rounded-full">
                  <Check className="w-4 h-4 text-[#4CD6B4]" />
                </div>
                <span className="text-gray-200">{service}</span>
              </div>
            ))}
          </div>
          
          <Button 
            className="glass-button rounded-full px-8 py-6 group"
            onClick={() => navigate("/auth/login")}
          >
            ابدأ باستخدام النظام
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          </Button>
        </div>
        
        <div className="relative">
          <div className="bg-gradient-overlay" />
          <img 
            src="/lovable-uploads/91fe343d-4b53-4607-89d9-af0070a4f130.png" 
            alt="Professional Legal Team" 
            className="w-full h-auto rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;