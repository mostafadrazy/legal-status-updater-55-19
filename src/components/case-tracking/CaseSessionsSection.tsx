import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar } from "lucide-react";

interface Session {
  session_date: string;
  next_session_date: string | null;
  room_number: string | null;
  decision: string | null;
  procedure_type: string | null;
}

interface CaseSessionsSectionProps {
  sessions: Session[];
}

export function CaseSessionsSection({ sessions }: CaseSessionsSectionProps) {
  const formatDate = (date: string | null) => {
    if (!date) return "غير محدد";
    return format(new Date(date), 'dd MMMM yyyy', { locale: ar });
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
    <div className="border-t border-white/10 pt-4">
      <h4 className="text-lg font-medium text-[#4CD6B4] mb-3">الجلسات</h4>
      <div className="space-y-4">
        {sessions.map((session, index) => (
          <div 
            key={index}
            className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center gap-2 text-[#4CD6B4]">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(session.session_date)}</span>
            </div>
            
            {session.room_number && (
              <div>
                <p className="text-sm text-gray-400">رقم القاعة</p>
                <p className="text-white">{session.room_number}</p>
              </div>
            )}

            {session.procedure_type && (
              <div>
                <p className="text-sm text-gray-400">نوع الإجراء</p>
                <p className="text-white">{session.procedure_type}</p>
              </div>
            )}

            {session.decision && (
              <div>
                <p className="text-sm text-gray-400">القرار</p>
                <p className="text-white">{session.decision}</p>
              </div>
            )}

            {session.next_session_date && (
              <div>
                <p className="text-sm text-gray-400">الجلسة القادمة</p>
                <p className="text-white">{formatDate(session.next_session_date)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}