import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CaseDetailsTab } from "./CaseDetailsTab";
import { NotesTab } from "./NotesTab";
import { DocumentsTab } from "./DocumentsTab";
import { SessionsTab } from "./sessions/SessionsTab";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
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
      <DialogContent className="bg-gradient-to-br from-[#111] to-[#1A1A1A] border-white/10 sm:max-w-5xl h-[90vh] overflow-hidden p-0" dir="rtl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4CD6B4]/5 to-transparent rounded-lg pointer-events-none" />
        
        <DialogHeader className="relative p-4 sm:p-6 border-b border-white/10">
          <DialogTitle className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
            تفاصيل القضية
          </DialogTitle>
          <p className="text-[#4CD6B4] text-sm sm:text-lg font-medium">{caseDetails?.case_number}</p>
        </DialogHeader>
        
        <div className="flex flex-col h-full overflow-hidden">
          <Tabs defaultValue="details" className="w-full h-full flex flex-col">
            <div className="px-2 sm:px-6 py-2 overflow-x-auto">
              <TabsList className="w-full flex gap-1 p-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl min-w-max">
                {['details', 'sessions', 'notes', 'documents'].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="flex-1 min-w-[100px] rounded-lg py-2 px-3 text-sm sm:text-base text-gray-300 font-medium
                      transition-all duration-300 ease-out whitespace-nowrap
                      hover:bg-white/10 hover:text-white
                      data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#4CD6B4] data-[state=active]:to-[#3BA997]
                      data-[state=active]:text-white data-[state=active]:shadow-lg
                      data-[state=active]:shadow-[#4CD6B4]/20"
                  >
                    {tab === 'details' && 'التفاصيل'}
                    {tab === 'sessions' && 'الجلسات'}
                    {tab === 'notes' && 'الملاحظات'}
                    {tab === 'documents' && 'المستندات'}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-6">
              <TabsContent value="details" className="mt-4 focus-visible:outline-none animate-fade-in h-full data-[state=inactive]:hidden">
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

              <TabsContent value="sessions" className="mt-4 focus-visible:outline-none animate-fade-in h-full data-[state=inactive]:hidden">
                {caseDetails && sessions && (
                  <SessionsTab
                    caseId={caseDetails.id}
                    sessions={sessions}
                    onSessionsChange={refetchSessions}
                  />
                )}
              </TabsContent>

              <TabsContent value="notes" className="mt-4 focus-visible:outline-none animate-fade-in h-full data-[state=inactive]:hidden">
                <NotesTab
                  notes={notes}
                  onAddNote={onAddNote}
                />
              </TabsContent>

              <TabsContent value="documents" className="mt-4 focus-visible:outline-none animate-fade-in h-full data-[state=inactive]:hidden">
                <DocumentsTab
                  documents={documents}
                  onUpload={onUpload}
                  onViewDocument={onViewDocument}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}