import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SessionsListProps {
  sessions: any[];
  onSessionsChange: () => void;
}

export function SessionsList({ sessions, onSessionsChange }: SessionsListProps) {
  const { toast } = useToast();

  const handleDelete = async (sessionId: string) => {
    const { error } = await supabase
      .from('case_sessions')
      .delete()
      .eq('id', sessionId);

    if (error) {
      toast({ 
        title: "خطأ", 
        description: "فشل في حذف الجلسة", 
        variant: "destructive" 
      });
      return;
    }

    toast({ 
      title: "نجاح", 
      description: "تم حذف الجلسة بنجاح" 
    });
    onSessionsChange();
  };

  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>لا توجد جلسات مسجلة</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="p-4 rounded-lg border border-white/10 bg-white/5 space-y-3"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#4CD6B4]">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(new Date(session.session_date), 'dd MMMM yyyy', { locale: ar })}
                </span>
              </div>
              {session.next_session_date && (
                <p className="text-sm text-gray-400">
                  الجلسة القادمة: {format(new Date(session.next_session_date), 'dd MMMM yyyy', { locale: ar })}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
              onClick={() => handleDelete(session.id)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>

          {session.room_number && (
            <p className="text-sm text-gray-300">
              رقم القاعة: {session.room_number}
            </p>
          )}
          
          {session.procedure_type && (
            <p className="text-sm text-gray-300">
              نوع الإجراء: {session.procedure_type}
            </p>
          )}

          {session.decision && (
            <div className="mt-2 p-3 rounded bg-white/5 text-sm">
              <p className="text-gray-400 mb-1">القرار:</p>
              <p className="text-white">{session.decision}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}