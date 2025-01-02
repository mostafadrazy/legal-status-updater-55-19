import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Search } from "@/components/Search";
import { CaseCard } from "@/components/CaseCard";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewCaseForm from "@/components/NewCaseForm";
import { useQuery } from "@tanstack/react-query";

interface Case {
  id: string;
  title: string;
  case_number: string;
  status: string;
  next_hearing: string;
  client: string;
}

export default function CaseTracking() {
  const { session } = useAuth();
  const [isNewCaseDialogOpen, setIsNewCaseDialogOpen] = useState(false);

  const { data: cases, isLoading } = useQuery({
    queryKey: ["cases", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .eq('user_id', session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Case[];
    },
    enabled: !!session?.user?.id,
  });

  if (!session) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="min-h-screen flex w-full bg-[#111]">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] 
          bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20"
        />
        <div 
          className="absolute bottom-0 left-1/4 w-[800px] h-[800px] 
          bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10"
        />
      </div>

      <Sidebar />
      
      <main className="flex-1 p-8 relative animate-fade-in">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
              القضايا
            </h1>
            <Button 
              className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black font-medium px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
              onClick={() => setIsNewCaseDialogOpen(true)}
            >
              <Plus className="w-4 h-4 ml-2" />
              إنشاء قضية
            </Button>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <Search />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="text-[#4CD6B4] animate-pulse">جاري التحميل...</div>
            ) : cases?.length === 0 ? (
              <div className="text-white/80">لا توجد قضايا</div>
            ) : (
              cases?.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="transform hover:-translate-y-1 transition-all duration-300"
                >
                  <CaseCard
                    caseNumber={caseItem.case_number}
                    title={caseItem.title}
                    status={caseItem.status}
                    nextHearing={caseItem.next_hearing}
                    client={caseItem.client}
                  />
                </div>
              ))
            )}
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