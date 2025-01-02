import { useState } from "react";
import { Calendar, User, Scale, Edit, Trash, PlusCircle, Upload, FileText } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedCase, setEditedCase] = useState({ title, status, nextHearing, client });
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const handleSaveChanges = async () => {
    const { error } = await supabase
      .from('cases')
      .update(editedCase)
      .eq('id', id);

    if (error) {
      toast({ title: "Error", description: "Failed to update case", variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Case updated successfully" });
    setIsEditing(false);
    queryClient.invalidateQueries({ queryKey: ['cases'] });
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from('cases')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete case", variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Case deleted successfully" });
    setShowDetails(false);
    queryClient.invalidateQueries({ queryKey: ['cases'] });
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    const { error } = await supabase
      .from('case_notes')
      .insert({
        case_id: id,
        content: newNote,
      });

    if (error) {
      toast({ title: "Error", description: "Failed to add note", variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Note added successfully" });
    setNewNote("");
    fetchNotes();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const filePath = `${id}/${crypto.randomUUID()}.${fileExt}`;

    try {
      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('case-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save file metadata to database
      const { error: dbError } = await supabase
        .from('case_documents')
        .insert({
          case_id: id,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
        });

      if (dbError) throw dbError;

      toast({ title: "Success", description: "File uploaded successfully" });
      fetchDocuments();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to upload file", variant: "destructive" });
    } finally {
      setIsUploading(false);
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
              <span className="text-sm">الجلسة القادمة: {nextHearing}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <User className="w-4 h-4 text-[#4CD6B4]" />
              <span className="text-sm">العميل: {client}</span>
            </div>
          </div>
          
          <button 
            onClick={() => {
              setShowDetails(true);
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
        <DialogContent className="bg-[#1F1F1F] border-white/10 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">تفاصيل القضية</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid grid-cols-4 gap-4 bg-white/5">
              <TabsTrigger value="details">التفاصيل</TabsTrigger>
              <TabsTrigger value="notes">الملاحظات</TabsTrigger>
              <TabsTrigger value="documents">المستندات</TabsTrigger>
              <TabsTrigger value="edit">تعديل</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 py-4">
              <div className="space-y-2">
                <h4 className="text-[#4CD6B4] font-medium">معلومات القضية</h4>
                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <p className="text-sm text-gray-400">رقم القضية</p>
                    <p className="text-white">{caseNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">الحالة</p>
                    <StatusBadge status={status} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">العنوان</p>
                    <p className="text-white">{title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">الجلسة القادمة</p>
                    <p className="text-white">{nextHearing || "غير محدد"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[#4CD6B4] font-medium">معلومات العميل</h4>
                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <p className="text-sm text-gray-400">اسم العميل</p>
                    <p className="text-white">{client}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex items-center gap-2"
                >
                  <Trash className="w-4 h-4" />
                  حذف القضية
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="أضف ملاحظة جديدة..."
                    className="flex-1"
                  />
                  <Button onClick={handleAddNote} className="flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                    إضافة
                  </Button>
                </div>

                <div className="space-y-4">
                  {notes.map((note) => (
                    <div key={note.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-white">{note.content}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        {new Date(note.created_at).toLocaleString('ar-SA')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-[#4CD6B4]" />
                      <p className="mb-2 text-sm text-gray-300">
                        <span className="font-semibold">اضغط للرفع</span> أو اسحب وأفلت
                      </p>
                    </div>
                    <Input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>

                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#4CD6B4]" />
                        <div>
                          <p className="text-white">{doc.file_name}</p>
                          <p className="text-sm text-gray-400">
                            {new Date(doc.uploaded_at).toLocaleString('ar-SA')}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={async () => {
                          const { data } = await supabase.storage
                            .from('case-documents')
                            .createSignedUrl(doc.file_path, 60);
                          
                          if (data?.signedUrl) {
                            window.open(data.signedUrl, '_blank');
                          }
                        }}
                      >
                        عرض
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="edit" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">العنوان</label>
                  <Input
                    value={editedCase.title}
                    onChange={(e) => setEditedCase({ ...editedCase, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">الحالة</label>
                  <Input
                    value={editedCase.status}
                    onChange={(e) => setEditedCase({ ...editedCase, status: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">الجلسة القادمة</label>
                  <Input
                    type="date"
                    value={editedCase.nextHearing}
                    onChange={(e) => setEditedCase({ ...editedCase, nextHearing: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">العميل</label>
                  <Input
                    value={editedCase.client}
                    onChange={(e) => setEditedCase({ ...editedCase, client: e.target.value })}
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSaveChanges} className="flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    حفظ التغييرات
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}