import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { CaseDetailsSection } from "@/components/case-tracking/CaseDetailsSection";
import { CaseSessionsSection } from "@/components/case-tracking/CaseSessionsSection";
import { SearchForm } from "@/components/case-tracking/SearchForm";
import { ClientInformation } from "@/components/case-tracking/ClientInformation";
import { LawyerInformation } from "@/components/case-tracking/LawyerInformation";

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
  const [isLoading, setIsLoading] = useState(false);
  const [caseDetails, setCaseDetails] = useState<Case | null>(null);
  const { toast } = useToast();

  const handleSearch = async (caseCode: string) => {
    setIsLoading(true);
    try {
      console.log("Setting case code for RLS policy...");
      const { error: fnError } = await supabase.rpc('set_case_code', {
        code: caseCode.toUpperCase()
      });

      if (fnError) {
        console.error("Error setting case code:", fnError);
        throw fnError;
      }

      console.log("Fetching case details...");
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

          <SearchForm onSearch={handleSearch} isLoading={isLoading} />

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

              <ClientInformation 
                client={caseDetails.client}
                clientPhone={caseDetails.client_phone}
                clientEmail={caseDetails.client_email}
              />

              <LawyerInformation lawyer={caseDetails.lawyer} />

              <CaseSessionsSection sessions={caseDetails.sessions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}