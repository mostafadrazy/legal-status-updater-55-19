import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Scale, Plus, ArrowRight, ExternalLink, Users, Shield } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Search } from "@/components/Search";
import { CaseCard } from "@/components/CaseCard";
import NewCaseForm from "@/components/NewCaseForm";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Services from "@/components/landing/Services";

const mockCases = [
  {
    title: "قضية عقارية - برج السلام",
    caseNumber: "CASE-001",
    status: "active" as const,
    lastUpdated: "منذ ساعتين",
    description: "نزاع على ملكية عقار في منطقة السلام"
  },
  {
    title: "قضية تجارية - شركة النور",
    caseNumber: "CASE-002",
    status: "pending" as const,
    lastUpdated: "منذ 3 أيام",
    description: "نزاع تجاري حول عقد توريد"
  }
];

const Index = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [isNewCaseDialogOpen, setIsNewCaseDialogOpen] = useState(false);

  if (session) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-[#111] to-[#1A1A1A]">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold text-white">القضايا الحديثة</h1>
                <Button 
                  className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black transition-all duration-300 transform hover:scale-105"
                  onClick={() => setIsNewCaseDialogOpen(true)}
                >
                  <Plus className="w-4 h-4 ml-2" />
                  إنشاء قضية
                </Button>
              </div>
              <div className="w-72">
                <Search />
              </div>
            </div>
            
            <div className="grid gap-6">
              {mockCases.map((caseItem, index) => (
                <div
                  key={caseItem.caseNumber}
                  className="transform hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CaseCard {...caseItem} />
                </div>
              ))}
            </div>
          </div>
        </main>
        <NewCaseForm 
          open={isNewCaseDialogOpen} 
          onOpenChange={setIsNewCaseDialogOpen}
        />
      </div>
    );
  }

  const stats = [
    { number: "1000+", label: "قضية تم إدارتها", icon: Scale },
    { number: "500+", label: "محامي يستخدم النظام", icon: Users },
    { number: "98%", label: "نسبة رضا العملاء", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C3E50] text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 backdrop-blur-lg bg-[#1A1F2C]/80 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 group">
              <Scale className="w-8 h-8 text-[#4CD6B4] group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
                نظام إدارة القضايا
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => window.open("#features", "_self")}
              >
                المميزات
              </Button>
              <Button 
                variant="ghost" 
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => window.open("#services", "_self")}
              >
                الخدمات
              </Button>
              <Button 
                className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black font-medium px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#4CD6B4]/20"
                onClick={() => navigate("/auth/login")}
              >
                تسجيل الدخول
                <ExternalLink className="w-4 h-4 mr-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <Hero />

        {/* Stats Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C] to-[#2C3E50] opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-[#4CD6B4]/50 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <stat.icon className="w-10 h-10 text-[#4CD6B4] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
                    {stat.number}
                  </h3>
                  <p className="text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Features />
        <Services />

        {/* Call to Action */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4CD6B4]/20 to-transparent opacity-20" />
            <div className="absolute -top-[40%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#4CD6B4]/10 blur-3xl" />
            <div className="absolute -bottom-[40%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[#4CD6B4]/10 blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
                ابدأ رحلتك القانونية معنا اليوم
              </h2>
              <p className="text-xl text-white/80">
                انضم إلى آلاف المحامين والمكاتب القانونية الذين يثقون بنا في إدارة قضاياهم بكفاءة عالية
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black font-medium px-8 rounded-full animate-fade-in group min-w-[200px]"
                  onClick={() => navigate("/auth/login")}
                >
                  ابدأ الآن مجاناً
                  <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-[#4CD6B4] text-[#4CD6B4] hover:bg-[#4CD6B4]/10 rounded-full min-w-[200px]"
                >
                  تواصل معنا
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 backdrop-blur-lg bg-[#1A1F2C]/80">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#4CD6B4]" />
              <span className="text-white/80">© 2024 نظام إدارة القضايا</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors">سياسة الخصوصية</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">الشروط والأحكام</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
