import React from 'react';
import { CheckCircle } from "lucide-react";

const Features = () => {
  const features = [
    "إدارة القضايا بكفاءة عالية",
    "متابعة المواعيد والجلسات",
    "إدارة الوثائق والمستندات",
    "التواصل مع العملاء",
    "إصدار التقارير والفواتير",
    "نظام تنبيهات متكامل",
  ];

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">مميزات النظام</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="flex items-center gap-4 p-6 rounded-lg bg-[#1A1A1A] hover:bg-[#222] transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CheckCircle className="text-[#4CD6B4] h-6 w-6 flex-shrink-0" />
            <span className="text-white/90">{feature}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;