import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import { SessionsList } from "./SessionsList";
import { AddSessionDialog } from "./AddSessionDialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface SessionsTabProps {
  caseId: string;
  sessions: any[];
  onSessionsChange: () => void;
}

export function SessionsTab({ caseId, sessions, onSessionsChange }: SessionsTabProps) {
  const [showAddSession, setShowAddSession] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleAddSession = async (sessionData: any) => {
    const { error } = await supabase
      .from('case_sessions')
      .insert({
        case_id: caseId,
        ...sessionData
      });

    if (error) {
      toast({ 
        title: "خطأ", 
        description: "فشل في إضافة الجلسة", 
        variant: "destructive" 
      });
      return;
    }

    toast({ 
      title: "نجاح", 
      description: "تمت إضافة الجلسة بنجاح" 
    });
    onSessionsChange();
    setShowAddSession(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">الجلسات</h3>
        <Button
          onClick={() => setShowAddSession(true)}
          className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black"
        >
          <Plus className="w-4 h-4 mr-2" />
          إضافة جلسة
        </Button>
      </div>

      <SessionsList 
        sessions={sessions} 
        onSessionsChange={onSessionsChange}
      />

      <AddSessionDialog
        open={showAddSession}
        onOpenChange={setShowAddSession}
        onSubmit={handleAddSession}
      />
    </div>
  );
}