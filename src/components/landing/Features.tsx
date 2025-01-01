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
    <section className="py-20 bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-12">
          <h2 className="text-3xl font-bold text-center mb-12">مميزات النظام</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle className="text-[#4CD6B4] h-5 w-5 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;