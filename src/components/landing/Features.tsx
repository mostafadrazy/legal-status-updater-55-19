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
            className="flex items-center gap-4 p-6 rounded-xl glass-card border border-legal-200/10 hover:border-legal-200/20 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="bg-gradient-to-br from-[#4CD6B4] to-[#2C9A82] p-2 rounded-lg">
              <CheckCircle className="text-white h-5 w-5 flex-shrink-0" />
            </div>
            <span className="text-legal-800 dark:text-legal-200 text-lg">{feature}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;