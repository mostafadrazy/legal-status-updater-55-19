import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { CasePreview } from "./case-preview/CasePreview";
import { CaseDetailsDialog } from "./case-details/CaseDetailsDialog";

interface CaseCardProps {
  id: string;
  caseNumber: string;
  title: string;
  status: string;
  nextHearing: string;
  client: string;
  caseCode?: string;
}

export function CaseCard({ 
  id, 
  caseNumber, 
  title, 
  status, 
  nextHearing, 
  client,
  caseCode 
}: CaseCardProps) {
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
      <CasePreview
        title={title}
        caseNumber={caseNumber}
        status={status}
        nextHearing={nextHearing}
        client={client}
        caseCode={caseCode}
        onClick={() => {
          setShowDetails(true);
          fetchCaseDetails();
          fetchNotes();
          fetchDocuments();
        }}
      />

      <CaseDetailsDialog
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        caseDetails={caseDetails}
        notes={notes}
        documents={documents}
        onDelete={handleDelete}
        onAddNote={handleAddNote}
        onUpload={handleFileUpload}
        onViewDocument={handleViewDocument}
      />
    </>
  );
}
