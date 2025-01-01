import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Scale, Plus, ArrowRight } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Search } from "@/components/Search";
import { CaseCard } from "@/components/CaseCard";
import NewCaseForm from "@/components/NewCaseForm";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Services from "@/components/landing/Services";

// Mock data for cases
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111] to-[#1A1A1A] text-white">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 group">
            <Scale className="w-8 h-8 text-[#4CD6B4] group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              نظام إدارة القضايا
            </span>
          </div>
          <Button 
            variant="ghost" 
            className="text-white hover:text-[#4CD6B4] transition-colors relative overflow-hidden group"
            onClick={() => navigate("/auth/login")}
          >
            <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
              تسجيل الدخول
            </span>
            <div className="absolute inset-0 bg-[#4CD6B4]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </Button>
        </div>
      </nav>

      <Hero />
      <Features />
      <Services />

      {/* Call to Action Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#4CD6B4]/5 backdrop-blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold leading-tight">
              ابدأ رحلتك القانونية معنا اليوم
            </h2>
            <p className="text-xl text-gray-400">
              انضم إلى آلاف المحامين والمكاتب القانونية الذين يثقون بنا
            </p>
            <Button 
              size="lg"
              className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black animate-fade-in min-w-[200px] group"
              onClick={() => navigate("/auth/login")}
            >
              ابدأ الآن
              <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;