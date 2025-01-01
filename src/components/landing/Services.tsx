import React from 'react';
import { FileText, Shield, FileCheck, Settings, Scale, Lock } from "lucide-react";

const Services = () => {
  const services = [
    { icon: FileText, label: "إنشاء الشركات", description: "خدمات شاملة لتأسيس وتسجيل الشركات" },
    { icon: Shield, label: "الحماية القانونية", description: "حماية حقوقك القانونية بشكل كامل" },
    { icon: FileCheck, label: "توثيق العقود", description: "خدمات توثيق وصياغة العقود القانونية" },
    { icon: Settings, label: "الاستشارات القانونية", description: "استشارات قانونية متخصصة" },
    { icon: Scale, label: "التمثيل القضائي", description: "تمثيل قانوني احترافي في المحاكم" },
    { icon: Lock, label: "حماية الملكية الفكرية", description: "حماية حقوق الملكية الفكرية والعلامات التجارية" },
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-12">
        <h2 className="text-3xl font-bold text-center mb-12">خدماتنا القانونية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.label}
              className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#4CD6B4]/50 transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <service.icon className="w-12 h-12 text-[#4CD6B4] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">{service.label}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;