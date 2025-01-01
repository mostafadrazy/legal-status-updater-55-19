import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Shield, Users, Briefcase, Scale, Lock, Plus, FileCheck, Settings } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Search } from "@/components/Search";
import { CaseCard } from "@/components/CaseCard";
import NewCaseForm from "@/components/NewCaseForm";
import { useState } from "react";

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
  { icon: FileText, label: "إنشاء الشركات" },
  { icon: Shield, label: "الحماية القانونية" },
  { icon: FileCheck, label: "توثيق العقود" },
  { icon: Settings, label: "الاستشارات القانونية" },
  { icon: Scale, label: "التمثيل القضائي" },
  { icon: Lock, label: "حماية الملكية الفكرية" },
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
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-white hover:text-[#4CD6B4]"
              onClick={() => navigate("/auth/login")}
            >
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            أفضل نظام لإدارة
            <span className="block bg-gradient-to-r from-[#4CD6B4] to-[#3BC5A3] bg-clip-text text-transparent">
              الخدمات القانونية
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "150ms" }}>
            منصة متكاملة لإدارة القضايا القانونية بكفاءة وفعالية، مصممة خصيصاً للمحامين والمكاتب القانونية
          </p>
          <Button 
            size="lg" 
            className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black animate-fade-in"
            style={{ animationDelay: "300ms" }}
            onClick={() => navigate("/auth/login")}
          >
            ابدأ الآن مجاناً
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-20 relative">
        <h2 className="text-3xl font-bold text-center mb-12">خدماتنا القانونية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.label}
              className="p-6 rounded-lg bg-[#1A1A1A] border border-gray-800 hover:border-[#4CD6B4]/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <service.icon className="w-12 h-12 text-[#4CD6B4] mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.label}</h3>
              <p className="text-gray-400">نقدم خدمات قانونية متكاملة تلبي احتياجات عملائنا بكفاءة وفعالية</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;