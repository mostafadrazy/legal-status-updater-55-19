import React from 'react';
import { FileText, Shield, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    { 
      icon: FileText,
      title: "إدارة القضايا الشاملة",
      description: "نظام متكامل لإدارة جميع القضايا والملفات القانونية مع تتبع سير العمل وإدارة المواعيد النهائية",
      action: "ابدأ الآن"
    },
    {
      icon: Shield,
      title: "بوابة العملاء الآمنة",
      description: "منصة آمنة تتيح للعملاء متابعة تطورات قضاياهم والوصول إلى المستندات بسهولة وأمان",
      action: "اكتشف المزيد"
    },
    {
      icon: FileCheck,
      title: "إدارة المستندات",
      description: "نظام متطور لتنظيم وأرشفة وتتبع جميع المستندات والوثائق القانونية مع إمكانية البحث السريع",
      action: "جرب الآن"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#4CD6B4]/5" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">خدماتنا المتميزة</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:border-[#4CD6B4]/50 transition-all duration-300 flex flex-col justify-between"
                style={{ minHeight: '400px' }}
              >
                <div>
                  <Icon className="w-12 h-12 text-[#4CD6B4] mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">{service.description}</p>
                </div>
                <Button 
                  variant="outline"
                  className="w-full border-[#4CD6B4] text-[#4CD6B4] hover:bg-[#4CD6B4] hover:text-white transition-all duration-300"
                >
                  {service.action}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;