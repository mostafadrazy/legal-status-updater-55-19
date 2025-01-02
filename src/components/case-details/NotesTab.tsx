import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { PlusCircle } from "lucide-react";
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
  );
}