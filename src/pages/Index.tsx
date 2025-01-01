import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Auth } from "@/components/Auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Plus, Scale, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
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

const Index = () => {
  const { session } = useAuth();
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
                  className="bg-blue-600 hover:bg-blue-700"
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
    <div className="min-h-screen bg-gradient-to-b from-legal-900 to-legal-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            نظام إدارة القضايا القانونية
          </h1>
          <p className="text-xl md:text-2xl text-legal-200 mb-8 max-w-3xl mx-auto">
            منصة متكاملة لإدارة القضايا القانونية بكفاءة وفعالية، مصممة خصيصاً للمحامين والمكاتب القانونية
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all">
              ابدأ الآن مجاناً
              <ArrowRight className="mr-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 transform hover:scale-105 transition-all">
              تعرف على المزيد
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 bg-legal-800/50 border-legal-700 transform hover:scale-105 transition-all animate-fade-in hover:border-blue-500/50">
            <div className="flex flex-col items-center text-center">
              <Scale className="w-12 h-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">إدارة القضايا بسهولة</h3>
              <p className="text-legal-300">تتبع وإدارة جميع القضايا القانونية في مكان واحد</p>
            </div>
          </Card>
          <Card className="p-6 bg-legal-800/50 border-legal-700 transform hover:scale-105 transition-all animate-fade-in hover:border-blue-500/50" style={{ animationDelay: "150ms" }}>
            <div className="flex flex-col items-center text-center">
              <Users className="w-12 h-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">تعاون الفريق</h3>
              <p className="text-legal-300">العمل بكفاءة مع الزملاء والعملاء</p>
            </div>
          </Card>
          <Card className="p-6 bg-legal-800/50 border-legal-700 transform hover:scale-105 transition-all animate-fade-in hover:border-blue-500/50" style={{ animationDelay: "300ms" }}>
            <div className="flex flex-col items-center text-center">
              <Shield className="w-12 h-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">أمان وخصوصية</h3>
              <p className="text-legal-300">حماية البيانات والمعلومات الحساسة</p>
            </div>
          </Card>
        </div>

        <div className="max-w-md mx-auto glass-card p-8 rounded-lg animate-fade-in" style={{ animationDelay: "450ms" }}>
          <Auth />
        </div>
      </div>
    </div>
  );
};

export default Index;