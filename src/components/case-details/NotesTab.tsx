import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { PlusCircle, MessageSquare, Mic, MicOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { cn } from "@/lib/utils";

interface NotesTabProps {
  notes: any[];
  onAddNote: (content: string) => Promise<void>;
}

export function NotesTab({ notes, onAddNote }: NotesTabProps) {
  const [newNote, setNewNote] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { session } = useAuth();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({
    commands: [
      {
        command: '*',
        callback: (command) => {
          console.log('Voice command received:', command);
          setNewNote((prev) => prev + " " + command);
        }
      }
    ]
  });

  useEffect(() => {
    if (listening) {
      console.log('Speech recognition is active');
    } else {
      console.log('Speech recognition is inactive');
    }
  }, [listening]);

  const handleMicClick = () => {
    if (!browserSupportsSpeechRecognition) {
      console.error("Browser doesn't support speech recognition");
      return;
    }

    if (listening) {
      console.log('Stopping speech recognition');
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      console.log('Starting speech recognition');
      resetTranscript();
      setIsListening(true);
      SpeechRecognition.startListening({ continuous: true, language: 'ar-MA' });
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    await onAddNote(newNote);
    setNewNote("");
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <div className="relative">
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="أضف ملاحظة جديدة..."
            className="min-h-[100px] bg-transparent border-white/10 focus:border-[#4CD6B4] transition-colors text-right pr-12"
            dir="rtl"
          />
          <Button
            type="button"
            onClick={handleMicClick}
            className={cn(
              "absolute left-2 bottom-2 rounded-xl p-2 transition-all duration-300 h-9 w-9",
              isListening
                ? "bg-red-500 text-white hover:bg-red-600 animate-pulse shadow-lg shadow-red-500/20"
                : "bg-gradient-to-r from-[#4CD6B4] to-[#34D399] text-white hover:shadow-lg hover:shadow-[#4CD6B4]/20 hover:scale-105"
            )}
          >
            {isListening ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </Button>
        </div>
        <div className="mt-4 flex justify-start">
          <Button onClick={handleAddNote} className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black">
            <PlusCircle className="w-4 h-4 ml-2" />
            إضافة ملاحظة
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div 
            key={note.id} 
            className="p-4 rounded-lg bg-white/5 border border-white/10 animate-fade-in"
            dir="rtl"
          >
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-[#4CD6B4] mt-1" />
              <div className="flex-1 text-right">
                <p className="text-white whitespace-pre-wrap">{note.content}</p>
                <p className="text-sm text-gray-400 mt-2" style={{ direction: 'ltr', textAlign: 'right' }}>
                  {formatDate(note.created_at)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}