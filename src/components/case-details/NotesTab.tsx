import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { PlusCircle, MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NotesTabProps {
  notes: any[];
  onAddNote: (content: string) => Promise<void>;
}

export function NotesTab({ notes, onAddNote }: NotesTabProps) {
  const [newNote, setNewNote] = useState("");
  const { session } = useAuth();

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    await onAddNote(newNote);
    setNewNote("");
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <Textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="أضف ملاحظة جديدة..."
          className="min-h-[100px] bg-transparent border-white/10 focus:border-[#4CD6B4] transition-colors"
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleAddNote} className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black">
            <PlusCircle className="w-4 h-4 mr-2" />
            إضافة ملاحظة
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div 
            key={note.id} 
            className="p-4 rounded-lg bg-white/5 border border-white/10 animate-fade-in"
          >
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-[#4CD6B4] mt-1" />
              <div className="flex-1">
                <p className="text-white whitespace-pre-wrap">{note.content}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(note.created_at).toLocaleString('ar-SA')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}