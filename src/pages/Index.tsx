import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Scale } from "lucide-react";
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
      <div className="flex h-screen bg-[#111]">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold text-white">القضايا الحديثة</h1>
                <Button 
                  className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black"
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
            
            <div className="grid gap-4">
              {mockCases.map((caseItem) => (
                <div
                  key={caseItem.caseNumber}
                  className="transform hover:-translate-y-1 transition-all duration-300 animate-fade-in"
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
    <div className="min-h-screen bg-[#111] text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scale className="w-8 h-8 text-[#4CD6B4]" />
            <span className="text-2xl font-bold">نظام إدارة القضايا</span>
          </div>
          <Button 
            variant="ghost" 
            className="text-white hover:text-[#4CD6B4] transition-colors"
            onClick={() => navigate("/auth/login")}
          >
            تسجيل الدخول
          </Button>
        </div>
      </nav>

      {/* Landing Page Sections */}
      <Hero />
      <Features />
      <Services />
    </div>
  );
};

export default Index;
