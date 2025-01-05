import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Case {
  case_code: string;
  title: string;
  status: string;
  next_hearing: string | null;
  court: string | null;
}

export default function CaseTracking() {
  const [caseCode, setCaseCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [caseDetails, setCaseDetails] = useState<Case | null>(null);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseCode.trim()) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("cases")
        .select("case_code, title, status, next_hearing, court")
        .eq("case_code", caseCode.toUpperCase())
        .single();

      if (error) throw error;
      
      if (data) {
        setCaseDetails(data);
      } else {
        toast({
          title: "لم يتم العثور على القضية",
          description: "يرجى التأكد من رمز القضية والمحاولة مرة أخرى",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "يرجى المحاولة مرة أخرى لاحقاً",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111]" dir="rtl">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-l from-white to-[#4CD6B4] bg-clip-text text-transparent mb-4">
              تتبع القضية
            </h1>
            <p className="text-gray-400">
              أدخل رمز القضية للاطلاع على تفاصيلها وحالتها
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Input
                value={caseCode}
                onChange={(e) => setCaseCode(e.target.value)}
                placeholder="أدخل رمز القضية..."
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
              <Button 
                type="submit"
                disabled={isLoading}
                className="absolute left-0 top-0 h-full bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {caseDetails && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">رمز القضية</p>
                  <p className="text-white">{caseDetails.case_code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">العنوان</p>
                  <p className="text-white">{caseDetails.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">الحالة</p>
                  <p className="text-white">{caseDetails.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">الجلسة القادمة</p>
                  <p className="text-white">{caseDetails.next_hearing || "غير محدد"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">المحكمة</p>
                  <p className="text-white">{caseDetails.court || "غير محدد"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}