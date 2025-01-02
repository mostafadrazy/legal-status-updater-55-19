import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CaseDetailsTab } from "./CaseDetailsTab";
import { NotesTab } from "./NotesTab";
import { DocumentsTab } from "./DocumentsTab";

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
  return (
    <Dialog open={showDetails} onOpenChange={setShowDetails}>
      <DialogContent className="bg-[#1F1F1F] border-white/10 max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">تفاصيل القضية</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-3 gap-4 bg-white/5">
            <TabsTrigger value="details">التفاصيل</TabsTrigger>
            <TabsTrigger value="notes">الملاحظات</TabsTrigger>
            <TabsTrigger value="documents">المستندات</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
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

          <TabsContent value="notes">
            <NotesTab
              notes={notes}
              onAddNote={onAddNote}
            />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsTab
              documents={documents}
              onUpload={onUpload}
              onViewDocument={onViewDocument}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}