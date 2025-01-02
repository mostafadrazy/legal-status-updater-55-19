import { Sidebar } from "@/components/Sidebar";
import { Search } from "@/components/Search";
import { NewCaseForm } from "@/components/NewCaseForm";
import { CaseCard } from "@/components/CaseCard";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function CaseTracking() {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-b from-black to-gray-900">
      {/* Background effects similar to landing page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
      </div>

      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">لوحة التحكم</h1>
            <NewCaseForm />
          </div>

          {/* Search */}
          <div className="glass-card p-4 rounded-xl">
            <Search />
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CaseCard
              caseNumber="2024/123"
              title="قضية تجارية"
              status="جاري"
              nextHearing="2024-03-20"
              client="شركة التقدم"
            />
            <CaseCard
              caseNumber="2024/124"
              title="قضية مدنية"
              status="معلق"
              nextHearing="2024-03-22"
              client="أحمد محمد"
            />
            <CaseCard
              caseNumber="2024/125"
              title="قضية عمالية"
              status="مغلق"
              nextHearing="2024-03-25"
              client="مؤسسة النور"
            />
          </div>
        </div>
      </main>
    </div>
  );
}