import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CaseDetailsTab } from "./CaseDetailsTab";
import { NotesTab } from "./NotesTab";
import { DocumentsTab } from "./DocumentsTab";
import { SessionsTab } from "./sessions/SessionsTab";
import { useTiltEffect } from "@/hooks/useTiltEffect";

interface CaseDetailsDialogProps {
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
  caseDetails: any;
  notes: any[];
  documents: any[];
  onDelete: () => void;
  onAddNote: (content: string) => void;
  onUpload: (file: File) => void;
  onViewDocument: (doc: any) => void;
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
  const tiltRef = useTiltEffect({
    max: 5,
    scale: 1.01,
    speed: 1000,
    glare: true,
    "max-glare": 0.1
  });

  return (
    <Dialog open={showDetails} onOpenChange={setShowDetails}>
      <DialogContent className="max-w-4xl bg-gradient-to-b from-white/5 to-white/[0.02] border-white/10" ref={tiltRef}>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">تفاصيل القضية</TabsTrigger>
            <TabsTrigger value="sessions">الجلسات</TabsTrigger>
            <TabsTrigger value="notes">الملاحظات</TabsTrigger>
            <TabsTrigger value="documents">المستندات</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <CaseDetailsTab caseDetails={caseDetails} onDelete={onDelete} />
          </TabsContent>

          <TabsContent value="sessions">
            <SessionsTab
              caseId={caseDetails?.id}
              sessions={caseDetails?.sessions || []}
              onSessionsChange={() => {}}
            />
          </TabsContent>

          <TabsContent value="notes">
            <NotesTab notes={notes} onAddNote={onAddNote} />
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