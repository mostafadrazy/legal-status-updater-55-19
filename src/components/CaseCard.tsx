import { useState } from "react";
import { Calendar, User, Scale } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { CaseDetailsTab } from "./case-details/CaseDetailsTab";
import { NotesTab } from "./case-details/NotesTab";
import { DocumentsTab } from "./case-details/DocumentsTab";

interface CaseCardProps {
  id: string;
  caseNumber: string;
  title: string;
  status: string;
  nextHearing: string;
  client: string;
}

export function CaseCard({ id, caseNumber, title, status, nextHearing, client }: CaseCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [caseDetails, setCaseDetails] = useState<any>(null);
  const [notes, setNotes] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const fetchCaseDetails = async () => {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      toast({ title: "Error", description: "Failed to fetch case details", variant: "destructive" });
      return;
    }
    
    setCaseDetails(data);
  };

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('case_notes')
      .select('*')
      .eq('case_id', id)
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({ title: "Error", description: "Failed to fetch notes", variant: "destructive" });
      return;
    }
    
    setNotes(data || []);
  };

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from('case_documents')
      .select('*')
      .eq('case_id', id)
      .order('uploaded_at', { ascending: false });
    
    if (error) {
      toast({ title: "Error", description: "Failed to fetch documents", variant: "destructive" });
      return;
    }
    
    setDocuments(data || []);
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from('cases')
      .delete()
      .eq('id', id)
      .eq('user_id', session?.user?.id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete case", variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Case deleted successfully" });
    setShowDetails(false);
    queryClient.invalidateQueries({ queryKey: ['cases'] });
  };

  const handleAddNote = async (content: string) => {
    const { error } = await supabase
      .from('case_notes')
      .insert({
        case_id: id,
        content,
        user_id: session?.user?.id
      });

    if (error) {
      toast({ title: "Error", description: "Failed to add note", variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Note added successfully" });
    fetchNotes();
  };

  const handleFileUpload = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `${session?.user?.id}/${crypto.randomUUID()}.${fileExt}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('case-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('case_documents')
        .insert({
          case_id: id,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          user_id: session?.user?.id
        });

      if (dbError) throw dbError;

      toast({ title: "Success", description: "File uploaded successfully" });
      fetchDocuments();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to upload file", variant: "destructive" });
    }
  };

  const handleViewDocument = async (doc: any) => {
    const { data } = await supabase.storage
      .from('case-documents')
      .createSignedUrl(doc.file_path, 60);
    
    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank');
    }
  };

  return (
    <>
      <div className="relative p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4CD6B4]/5 to-transparent rounded-xl" />
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
              <p className="text-[#4CD6B4] text-sm">رقم القضية: {caseNumber}</p>
            </div>
            <StatusBadge status={status} />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-300">
              <Calendar className="w-4 h-4 text-[#4CD6B4]" />
              <span className="text-sm">الجلسة القادمة: {nextHearing || "غير محدد"}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <User className="w-4 h-4 text-[#4CD6B4]" />
              <span className="text-sm">العميل: {client}</span>
            </div>
          </div>
          
          <button 
            onClick={() => {
              setShowDetails(true);
              fetchCaseDetails();
              fetchNotes();
              fetchDocuments();
            }}
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#4CD6B4] text-[#4CD6B4] hover:bg-[#4CD6B4] hover:text-black transition-all duration-300"
          >
            <Scale className="w-4 h-4" />
            <span>عرض التفاصيل</span>
          </button>
        </div>
      </div>

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
                  caseNumber={caseDetails.case_number}
                  title={caseDetails.title}
                  status={caseDetails.status}
                  nextHearing={caseDetails.next_hearing}
                  client={caseDetails.client}
                  clientPhone={caseDetails.client_phone}
                  clientEmail={caseDetails.client_email}
                  clientAddress={caseDetails.client_address}
                  court={caseDetails.court}
                  caseType={caseDetails.case_type}
                  opposingParty={caseDetails.opposing_party}
                  opposingLawyer={caseDetails.opposing_lawyer}
                  filingDate={caseDetails.filing_date}
                  onDelete={handleDelete}
                />
              )}
            </TabsContent>

            <TabsContent value="notes">
              <NotesTab
                notes={notes}
                onAddNote={handleAddNote}
              />
            </TabsContent>

            <TabsContent value="documents">
              <DocumentsTab
                documents={documents}
                onUpload={handleFileUpload}
                onViewDocument={handleViewDocument}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}