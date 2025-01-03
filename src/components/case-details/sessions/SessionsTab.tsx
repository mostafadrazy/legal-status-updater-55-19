import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SessionsList } from "./SessionsList";
import { AddSessionDialog } from "./AddSessionDialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

interface SessionsTabProps {
  caseId: string;
  sessions: any[];
  onSessionsChange: () => void;
}

export function SessionsTab({ caseId, sessions, onSessionsChange }: SessionsTabProps) {
  const [showAddSession, setShowAddSession] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const handleAddSession = async (sessionData: any) => {
    const { error } = await supabase
      .from('case_sessions')
      .insert({
        case_id: caseId,
        user_id: session?.user?.id,
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
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">الجلسات</h3>
        <Button
          onClick={() => setShowAddSession(true)}
          className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black gap-2"
        >
          <Plus className="w-4 h-4" />
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