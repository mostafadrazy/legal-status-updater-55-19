import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Shield, Users, Briefcase, Scale, Lock } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-legal-900 to-legal-800">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scale className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">نظام إدارة القضايا</span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-white hover:text-blue-400"
              onClick={() => navigate("/auth/login")}
            >
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in">
          أفضل نظام لإدارة
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            القضايا القانونية
          </span>
        </h1>
        <p className="text-xl text-legal-200 mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "150ms" }}>
          منصة متكاملة لإدارة القضايا القانونية بكفاءة وفعالية، مصممة خصيصاً للمحامين والمكاتب القانونية
        </p>
        <Button 
          size="lg" 
          className="bg-blue-600 hover:bg-blue-700 animate-fade-in"
          style={{ animationDelay: "300ms" }}
          onClick={() => navigate("/auth/login")}
        >
          ابدأ الآن مجاناً
        </Button>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">خدماتنا القانونية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg bg-legal-800/50 border border-legal-700 hover:border-blue-500/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-legal-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    title: "إدارة القضايا",
    description: "تتبع وإدارة جميع القضايا القانونية في مكان واحد",
    icon: FileText
  },
  {
    title: "إدارة العملاء",
    description: "إدارة معلومات وملفات العملاء بشكل فعال",
    icon: Users
  },
  {
    title: "إدارة المستندات",
    description: "تنظيم وتخزين المستندات القانونية بأمان",
    icon: Briefcase
  },
  {
    title: "الأمن والخصوصية",
    description: "حماية البيانات والمعلومات الحساسة",
    icon: Shield
  },
  {
    title: "التقارير والإحصائيات",
    description: "تحليل وتتبع أداء القضايا والمكتب",
    icon: Scale
  },
  {
    title: "صلاحيات الوصول",
    description: "إدارة صلاحيات الوصول للمستخدمين",
    icon: Lock
  }
];

export default Index;
