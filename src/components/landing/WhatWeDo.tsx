import React from 'react';
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatWeDo = () => {
  const services = [
    "تأسيس الشركات",
    "التمويل الآمن",
    "التمويل غير الربحي",
    "اتفاقيات التوظيف",
    "الاستشارات القانونية",
    "خطة الحوافز",
    "اتفاقيات عدم الإفصاح",
    "شروط الخدمة الأساسية",
    "سياسة الخصوصية",
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">ماذا نقدم</h2>
              <p className="text-gray-400 mb-8">
                للخدمات القانونية الشائعة والموحدة، نقدم منصة خدمة ذاتية بسيطة تمكنك من إنشاء المستندات المخصصة عن طريق إكمال نموذج في ثلاث دقائق أو أقل.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {services.map((service, index) => (
                  <div 
                    key={service}
                    className="flex items-center gap-2 text-sm text-gray-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Check className="w-4 h-4 text-[#4CD6B4]" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
              <Button 
                className="bg-white hover:bg-gray-100 text-black font-medium rounded-full group"
              >
                إنشاء مستندات مخصصة
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4CD6B4]/20 to-transparent opacity-30 rounded-3xl" />
              <img 
                src="/lovable-uploads/59a01f24-3d87-43f4-b81b-c638cbce0378.png" 
                alt="Interface Preview" 
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;