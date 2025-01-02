import React from 'react';
import { FileText, Shield, FileCheck, Settings, Scale, Lock, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    { 
      icon: Scale,
      title: "إدارة القضايا الشاملة",
      description: "نظام متكامل لإدارة وتتبع جميع القضايا من مكان واحد"
    },
    {
      icon: Users,
      title: "بوابة العملاء",
      description: "منصة آمنة للعملاء لمتابعة تطورات قضاياهم بسهولة"
    },
    {
      icon: FileText,
      title: "إدارة المستندات",
      description: "تنظيم وتخزين جميع المستندات والوثائق القانونية"
    },
    {
      icon: Search,
      title: "بحث متقدم",
      description: "إمكانية البحث السريع في القضايا والمستندات"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#4CD6B4]/5" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">لماذا تختار نظامنا؟</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            نظام مصمم خصيصاً للمحامين، يوفر جميع الأدوات اللازمة لإدارة القضايا بكفاءة عالية
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#4CD6B4]/50 transition-all duration-300 animate-fade-in group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Icon className="w-12 h-12 text-[#4CD6B4] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black font-medium px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            جرب النظام مجاناً
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;