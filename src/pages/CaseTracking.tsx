import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { CaseDetailsSection } from "@/components/case-tracking/CaseDetailsSection";
import { CaseSessionsSection } from "@/components/case-tracking/CaseSessionsSection";

interface Case {
  case_code: string;
  title: string;
  status: string;
  court: string | null;
  case_type: string | null;
  filing_date: string | null;
  client: string;
  client_phone: string | null;
  client_email: string | null;
  latest_session?: {
    session_date: string;
    decision: string | null;
    next_session_date: string | null;
  };
  lawyer?: {
    full_name: string | null;
    phone_number: string | null;
  };
  sessions: Array<{
    session_date: string;
    next_session_date: string | null;
    room_number: string | null;
    decision: string | null;
    procedure_type: string | null;
  }>;
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
      console.log("Setting case code for RLS policy...");
      // First, set the case code for RLS policy
      const { error: fnError } = await supabase.rpc('set_case_code', {
        code: caseCode.toUpperCase()
      });

      if (fnError) {
        console.error("Error setting case code:", fnError);
        throw fnError;
      }

      console.log("Fetching case details...");
      // Fetch case details
      const { data: caseData, error: caseError } = await supabase
        .from("cases")
        .select(`
          *,
          user_id
        `)
        .eq("case_code", caseCode.toUpperCase())
        .single();

      if (caseError) {
        console.error("Error fetching case:", caseError);
        throw caseError;
      }
      
      if (caseData) {
        console.log("Case found:", caseData);
        
        // Fetch sessions for the case
        console.log("Fetching sessions...");
        const { data: sessionsData, error: sessionsError } = await supabase
          .from("case_sessions")
          .select("*")
          .eq("case_id", caseData.id)
          .order("session_date", { ascending: false });

        if (sessionsError) {
          console.error("Error fetching sessions:", sessionsError);
          throw sessionsError;
        }

        console.log("Sessions found:", sessionsData);

        // Fetch lawyer details
        const { data: lawyerData } = await supabase
          .from("profiles")
          .select("full_name, phone_number")
          .eq("id", caseData.user_id)
          .single();

        setCaseDetails({
          ...caseData,
          lawyer: lawyerData,
          sessions: sessionsData || []
        });
      } else {
        toast({
          title: "لم يتم العثور على القضية",
          description: "يرجى التأكد من رمز القضية والمحاولة مرة أخرى",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in handleSearch:", error);
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
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-6 animate-fade-in">
              <CaseDetailsSection 
                title={caseDetails.title}
                caseCode={caseDetails.case_code}
                status={caseDetails.status}
                court={caseDetails.court}
                caseType={caseDetails.case_type}
                filingDate={caseDetails.filing_date}
              />

              <div className="border-t border-white/10 pt-4">
                <h4 className="text-lg font-medium text-[#4CD6B4] mb-3">معلومات العميل</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">اسم العميل</p>
                    <p className="text-white">{caseDetails.client}</p>
                  </div>
                  {caseDetails.client_phone && (
                    <div>
                      <p className="text-sm text-gray-400">رقم الهاتف</p>
                      <p className="text-white">{caseDetails.client_phone}</p>
                    </div>
                  )}
                  {caseDetails.client_email && (
                    <div>
                      <p className="text-sm text-gray-400">البريد الإلكتروني</p>
                      <p className="text-white">{caseDetails.client_email}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h4 className="text-lg font-medium text-[#4CD6B4] mb-3">معلومات المحامي</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">اسم المحامي</p>
                    <p className="text-white">{caseDetails.lawyer?.full_name || "غير محدد"}</p>
                  </div>
                  {caseDetails.lawyer?.phone_number && (
                    <div>
                      <p className="text-sm text-gray-400">رقم الهاتف</p>
                      <p className="text-white">{caseDetails.lawyer.phone_number}</p>
                    </div>
                  )}
                </div>
              </div>

              <CaseSessionsSection sessions={caseDetails.sessions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}