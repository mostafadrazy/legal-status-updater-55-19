import React from 'react';
import { CheckCircle2, Users, FileText, Calendar, Shield, BarChart3, ArrowLeft, Sparkles, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import professionalLegalTeam from "@/assets/professional-legal-team.jpg";

const WhatWeDo = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: FileText,
      title: "إدارة القضايا المتقدمة",
      description: "نظام شامل لإدارة وتتبع جميع القضايا والملفات القانونية بكفاءة عالية"
    },
    {
      icon: Calendar,
      title: "جدولة المواعيد الذكية",
      description: "متابعة تلقائية للجلسات والمواعيد مع تذكيرات فورية"
    },
    {
      icon: Users,
      title: "إدارة العملاء",
      description: "بوابة آمنة ومتكاملة لإدارة معلومات العملاء والتواصل معهم"
    },
    {
      icon: Shield,
      title: "أمان المعلومات",
      description: "حماية متقدمة للبيانات القانونية الحساسة والوثائق السرية"
    },
    {
      icon: BarChart3,
      title: "تقارير تفصيلية",
      description: "إنشاء تقارير شاملة وتحليلات دقيقة لأداء المكتب القانوني"
    },
    {
      icon: CheckCircle2,
      title: "تتبع حالة القضايا",
      description: "مراقبة مستمرة لتطورات القضايا مع إشعارات فورية"
    }
  ];

  const stats = [
    { number: "500+", label: "قضية نشطة", icon: Target },
    { number: "98%", label: "معدل النجاح", icon: Sparkles },
    { number: "24/7", label: "دعم فني", icon: Zap },
    { number: "10K+", label: "عميل راضي", icon: Users },
    { number: "50+", label: "محامي نشط", icon: Shield },
    { number: "99.9%", label: "أمان البيانات", icon: BarChart3 },
    { number: "15+", label: "سنة خبرة", icon: Calendar }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#4CD6B4]/20 px-6 py-3 rounded-full mb-8 backdrop-blur-sm border border-[#4CD6B4]/30">
            <Sparkles className="w-5 h-5 text-[#4CD6B4]" />
            <span className="text-[#4CD6B4] font-semibold">خدماتنا المتميزة</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
              ما نقدمه لك
            </span>
          </h2>
          <p className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            حلول تقنية متطورة ومبتكرة تعيد تعريف إدارة المكاتب القانونية
            <br />
            <span className="text-[#4CD6B4] font-semibold">بكفاءة استثنائية وأمان مطلق</span>
          </p>
        </div>

        {/* Stats Section with Image */}
        <div className="mb-20">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Background image */}
            <div className="aspect-[16/9] md:aspect-[21/9] relative">
              <img 
                src={professionalLegalTeam}
                alt="Professional Legal Technology Team - Modern Office Environment" 
                className="w-full h-full object-cover"
              />
              
              {/* Stats overlay on the image - hidden on mobile, visible on tablet+ */}
              <div className="absolute inset-0 hidden md:flex items-center justify-start p-8">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 max-w-5xl">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={index} className="text-center group">
                        <div className="bg-gradient-to-br from-[#4CD6B4]/25 to-[#4CD6B4]/15 backdrop-blur-xl p-4 rounded-xl border border-[#4CD6B4]/40 group-hover:border-[#4CD6B4]/70 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#4CD6B4]/20">
                          <IconComponent className="w-6 h-6 text-[#4CD6B4] mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                          <div className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-[#4CD6B4] transition-colors duration-300">
                            {stat.number}
                          </div>
                          <div className="text-gray-300 font-medium text-xs md:text-sm">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats Section - visible only on mobile */}
        <div className="mb-20 md:hidden">
          <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-br from-[#4CD6B4]/25 to-[#4CD6B4]/15 backdrop-blur-xl p-4 rounded-xl border border-[#4CD6B4]/40 group-hover:border-[#4CD6B4]/70 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#4CD6B4]/20">
                    <IconComponent className="w-6 h-6 text-[#4CD6B4] mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-xl font-bold text-white mb-1 group-hover:text-[#4CD6B4] transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 font-medium text-xs">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Animated border */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#4CD6B4]/40 to-[#4CD6B4]/20 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative bg-[#8E9196]/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-[#4CD6B4]/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#4CD6B4]/25">
                  {/* Icon with consistent website colors */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4CD6B4]/25 to-[#4CD6B4]/15 p-4 mb-6 group-hover:scale-110 group-hover:from-[#4CD6B4]/35 group-hover:to-[#4CD6B4]/25 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-[#4CD6B4]" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#4CD6B4] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg mb-6">
                    {feature.description}
                  </p>
                  
                  {/* Hover effect arrow */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowLeft className="w-6 h-6 text-[#4CD6B4]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Enhanced CTA */}
        <div className="text-center">
          <div className="relative inline-block">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4CD6B4] to-[#4CD6B4]/70 rounded-2xl blur-xl opacity-60 animate-pulse"></div>
            
            <Button 
              className="relative bg-gradient-to-r from-[#4CD6B4] to-[#4CD6B4]/90 hover:from-[#4CD6B4]/95 hover:to-[#4CD6B4]/85 px-12 py-6 text-xl font-bold rounded-2xl text-white border-0 shadow-2xl hover:shadow-[#4CD6B4]/60 transition-all duration-300 hover:scale-105 group"
              onClick={() => navigate("/auth/login")}
            >
              <span className="flex items-center gap-4">
                ابدأ تجربتك المجانية الآن
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform duration-300" />
              </span>
            </Button>
          </div>
          
          <p className="text-gray-400 mt-6 text-lg">
            لا حاجة لبطاقة ائتمان • إعداد فوري • دعم مجاني
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
