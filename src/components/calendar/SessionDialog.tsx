import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface Session {
  id: string;
  session_date: string;
  next_session_date: string | null;
  room_number: string | null;
  procedure_type: string | null;
  case: {
    id: string;
    title: string;
    case_number: string;
    status: string;
    client: string;
  };
}

interface SessionDialogProps {
  session: Session | null;
  onClose: () => void;
}

export function SessionDialog({ session, onClose }: SessionDialogProps) {
  if (!session) return null;

  return (
    <Dialog open={!!session} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-[#111] to-[#1A1A1A] border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            تفاصيل الجلسة
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="glass-card p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{session.case.title}</h3>
              <Badge variant="outline" className="text-[#4CD6B4] border-[#4CD6B4]">
                {session.case.case_number}
              </Badge>
            </div>
            
            <div className="space-y-2 text-gray-400">
              <p>العميل: {session.case.client}</p>
              <p>الحالة: {session.case.status}</p>
              {session.procedure_type && (
                <p>نوع الجلسة: {session.procedure_type}</p>
              )}
              {session.room_number && (
                <p>قاعة: {session.room_number}</p>
              )}
              <p>تاريخ الجلسة: {format(new Date(session.session_date), 'dd MMMM yyyy', { locale: ar })}</p>
              {session.next_session_date && (
                <p>الجلسة القادمة: {format(new Date(session.next_session_date), 'dd MMMM yyyy', { locale: ar })}</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}