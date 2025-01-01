import { useAuth } from "@/contexts/AuthContext";
import { Auth } from "@/components/Auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Scale, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { session } = useAuth();

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
                <NewCaseForm 
                  open={isNewCaseDialogOpen} 
                  onOpenChange={setIsNewCaseDialogOpen}
                />
              </div>
              <div className="relative w-72">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في القضايا..."
                  className="pr-8 bg-[#222] border-gray-700 text-gray-200 placeholder:text-gray-500"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              {mockCases.map((caseItem, index) => (
                <div
                  key={caseItem.caseNumber}
                  className="transform hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CaseCard {...caseItem} />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-legal-900 to-legal-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">نظام إدارة القضايا القانونية</h1>
          <p className="text-xl md:text-2xl text-legal-200 mb-8">
            منصة متكاملة لإدارة القضايا القانونية بكفاءة وفعالية
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              ابدأ الآن مجاناً
              <ArrowRight className="mr-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              تعرف على المزيد
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 bg-legal-800/50 border-legal-700">
            <div className="flex flex-col items-center text-center">
              <Scale className="w-12 h-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">إدارة القضايا بسهولة</h3>
              <p className="text-legal-300">تتبع وإدارة جميع القضايا القانونية في مكان واحد</p>
            </div>
          </Card>
          <Card className="p-6 bg-legal-800/50 border-legal-700">
            <div className="flex flex-col items-center text-center">
              <Users className="w-12 h-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">تعاون الفريق</h3>
              <p className="text-legal-300">العمل بكفاءة مع الزملاء والعملاء</p>
            </div>
          </Card>
          <Card className="p-6 bg-legal-800/50 border-legal-700">
            <div className="flex flex-col items-center text-center">
              <Shield className="w-12 h-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">أمان وخصوصية</h3>
              <p className="text-legal-300">حماية البيانات والمعلومات الحساسة</p>
            </div>
          </Card>
        </div>

        <div className="max-w-md mx-auto">
          <Auth />
        </div>
      </div>
    </div>
  );
};

export default Index;