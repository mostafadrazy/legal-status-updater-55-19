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
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">خدماتنا المتميزة</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-xl bg-[#8E9196]/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
                style={{ minHeight: '400px' }}
              >
                <div>
                  <div className="bg-gradient-to-br from-[#4CD6B4] to-[#2C9A82] p-3 rounded-lg w-fit mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
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