import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CaseDetailsTab } from "./CaseDetailsTab";
import { NotesTab } from "./NotesTab";
import { DocumentsTab } from "./DocumentsTab";
import { SessionsTab } from "./sessions/SessionsTab";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CaseDetailsDialogProps {
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
  caseDetails: any;
  notes: any[];
  documents: any[];
  onDelete: () => Promise<void>;
  onAddNote: (content: string) => Promise<void>;
  onUpload: (file: File) => Promise<void>;
  onViewDocument: (doc: any) => Promise<void>;
}

export function CaseDetailsDialog({
  showDetails,
  setShowDetails,
  caseDetails,
  notes,
  documents,
  onDelete,
  onAddNote,
  onUpload,
  onViewDocument,
}: CaseDetailsDialogProps) {
  const { data: sessions, refetch: refetchSessions } = useQuery({
    queryKey: ['case-sessions', caseDetails?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('case_sessions')
        .select('*')
        .eq('case_id', caseDetails?.id)
        .order('session_date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!caseDetails?.id
  });

  return (
    <Dialog open={showDetails} onOpenChange={setShowDetails}>
      <DialogContent className="bg-gradient-to-br from-[#111] to-[#1A1A1A] border-white/10 max-w-5xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4CD6B4]/5 to-transparent rounded-lg pointer-events-none" />
        
        <DialogHeader className="relative space-y-2 pb-6 border-b border-white/10">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
            تفاصيل القضية
          </DialogTitle>
          <p className="text-[#4CD6B4] text-lg font-medium">{caseDetails?.case_number}</p>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="w-full mt-8 relative">
          <TabsList className="flex items-center justify-between gap-4 p-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
            <TabsTrigger 
              value="details"
              className="flex-1 rounded-md py-3 px-4 text-gray-200
                transition-all duration-300 ease-in-out
                hover:bg-white/20 hover:text-white hover:shadow-lg
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#4CD6B4] data-[state=active]:to-[#3BA997]
                data-[state=active]:text-white data-[state=active]:shadow-lg
                data-[state=active]:shadow-[0_0_15px_rgba(76,214,180,0.3)]
                transform hover:scale-[1.02] active:scale-[0.98]"
            >
              التفاصيل
            </TabsTrigger>
            <TabsTrigger 
              value="sessions"
              className="flex-1 rounded-md py-3 px-4 text-gray-200
                transition-all duration-300 ease-in-out
                hover:bg-white/20 hover:text-white hover:shadow-lg
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#4CD6B4] data-[state=active]:to-[#3BA997]
                data-[state=active]:text-white data-[state=active]:shadow-lg
                data-[state=active]:shadow-[0_0_15px_rgba(76,214,180,0.3)]
                transform hover:scale-[1.02] active:scale-[0.98]"
            >
              الجلسات
            </TabsTrigger>
            <TabsTrigger 
              value="notes"
              className="flex-1 rounded-md py-3 px-4 text-gray-200
                transition-all duration-300 ease-in-out
                hover:bg-white/20 hover:text-white hover:shadow-lg
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#4CD6B4] data-[state=active]:to-[#3BA997]
                data-[state=active]:text-white data-[state=active]:shadow-lg
                data-[state=active]:shadow-[0_0_15px_rgba(76,214,180,0.3)]
                transform hover:scale-[1.02] active:scale-[0.98]"
            >
              الملاحظات
            </TabsTrigger>
            <TabsTrigger 
              value="documents"
              className="flex-1 rounded-md py-3 px-4 text-gray-200
                transition-all duration-300 ease-in-out
                hover:bg-white/20 hover:text-white hover:shadow-lg
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#4CD6B4] data-[state=active]:to-[#3BA997]
                data-[state=active]:text-white data-[state=active]:shadow-lg
                data-[state=active]:shadow-[0_0_15px_rgba(76,214,180,0.3)]
                transform hover:scale-[1.02] active:scale-[0.98]"
            >
              المستندات
            </TabsTrigger>
          </TabsList>

          <div className="space-y-6">
            <TabsContent value="details" className="focus-visible:outline-none animate-fade-in">
              {caseDetails && (
                <CaseDetailsTab
                  id={caseDetails.id}
                  caseNumber={caseDetails.case_number}
                  title={caseDetails.title}
                  status={caseDetails.status}
                  nextHearing={caseDetails.next_hearing}
                  client={caseDetails.client}
                  clientPhone={caseDetails.client_phone}
                  clientEmail={caseDetails.client_email}
                  court={caseDetails.court}
                  caseType={caseDetails.case_type}
                  opposingParty={caseDetails.opposing_party}
                  opposingLawyer={caseDetails.opposing_lawyer}
                  filingDate={caseDetails.filing_date}
                  onDelete={onDelete}
                />
              )}
            </TabsContent>

            <TabsContent value="sessions" className="focus-visible:outline-none animate-fade-in">
              {caseDetails && sessions && (
                <SessionsTab
                  caseId={caseDetails.id}
                  sessions={sessions}
                  onSessionsChange={refetchSessions}
                />
              )}
            </TabsContent>

            <TabsContent value="notes" className="focus-visible:outline-none animate-fade-in">
              <NotesTab
                notes={notes}
                onAddNote={onAddNote}
              />
            </TabsContent>

            <TabsContent value="documents" className="focus-visible:outline-none animate-fade-in">
              <DocumentsTab
                documents={documents}
                onUpload={onUpload}
                onViewDocument={onViewDocument}
              />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}