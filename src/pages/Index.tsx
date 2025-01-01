import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Shield, Users, Briefcase, Scale, Lock, Plus, FileCheck, Settings, CheckCircle, ArrowRight } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Search } from "@/components/Search";
import { CaseCard } from "@/components/CaseCard";
import NewCaseForm from "@/components/NewCaseForm";

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

const services = [
  { icon: FileText, label: "إنشاء الشركات", description: "خدمات شاملة لتأسيس وتسجيل الشركات" },
  { icon: Shield, label: "الحماية القانونية", description: "حماية حقوقك القانونية بشكل كامل" },
  { icon: FileCheck, label: "توثيق العقود", description: "خدمات توثيق وصياغة العقود القانونية" },
  { icon: Settings, label: "الاستشارات القانونية", description: "استشارات قانونية متخصصة" },
  { icon: Scale, label: "التمثيل القضائي", description: "تمثيل قانوني احترافي في المحاكم" },
  { icon: Lock, label: "حماية الملكية الفكرية", description: "حماية حقوق الملكية الفكرية والعلامات التجارية" },
];

const features = [
  "إدارة القضايا بكفاءة عالية",
  "متابعة المواعيد والجلسات",
  "إدارة الوثائق والمستندات",
  "التواصل مع العملاء",
  "إصدار التقارير والفواتير",
  "نظام تنبيهات متكامل",
];

const testimonials = [
  {
    name: "أحمد محمد",
    role: "محامي",
    content: "نظام متكامل ساعدني في تنظيم عملي بشكل أفضل",
  },
  {
    name: "سارة أحمد",
    role: "مستشار قانوني",
    content: "واجهة سهلة الاستخدام وميزات متقدمة",
  },
  {
    name: "محمد علي",
    role: "مدير مكتب محاماة",
    content: "أفضل نظام لإدارة القضايا جربته حتى الآن",
  },
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            أفضل نظام لإدارة
            <span className="block bg-gradient-to-l from-[#4CD6B4] to-[#3BC5A3] bg-clip-text text-transparent">
              الخدمات القانونية
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto animate-fade-in">
            منصة متكاملة لإدارة القضايا القانونية بكفاءة وفعالية، مصممة خصيصاً للمحامين والمكاتب القانونية
          </p>
          <Button 
            size="lg" 
            className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black animate-fade-in"
            onClick={() => navigate("/auth/login")}
          >
            ابدأ الآن مجاناً
            <ArrowRight className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">مميزات النظام</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg bg-[#222] border border-gray-800 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle className="text-[#4CD6B4] h-5 w-5 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">خدماتنا القانونية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.label}
              className="p-6 rounded-lg bg-[#1A1A1A] border border-gray-800 hover:border-[#4CD6B4]/50 transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <service.icon className="w-12 h-12 text-[#4CD6B4] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">{service.label}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">آراء العملاء</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-[#222] border border-gray-800 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <p className="text-gray-300 mb-4">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4CD6B4]/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#4CD6B4]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ابدأ في تنظيم عملك القانوني اليوم
          </h2>
          <p className="text-gray-400 mb-8">
            انضم إلى مئات المحامين الذين يستخدمون نظامنا لإدارة أعمالهم بكفاءة
          </p>
          <Button 
            size="lg" 
            className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black"
            onClick={() => navigate("/auth/login")}
          >
            جرب النظام مجاناً
            <ArrowRight className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
