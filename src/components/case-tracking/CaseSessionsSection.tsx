import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar, Clock, MapPin, FileText, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  // Sort sessions by date in descending order (most recent first)
  const sortedSessions = [...sessions].sort((a, b) => {
    return new Date(b.session_date).getTime() - new Date(a.session_date).getTime();
  });

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12 bg-white/5 rounded-lg border border-white/10">
        <Calendar className="w-16 h-16 mx-auto mb-4 text-[#4CD6B4] opacity-50" />
        <h3 className="text-lg font-medium text-white mb-2">لا توجد جلسات</h3>
        <p className="text-gray-400">لم يتم تسجيل أي جلسات لهذه القضية بعد</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-[#4CD6B4]" />
        <h3 className="text-lg font-medium text-white">الجلسات المسجلة</h3>
      </div>

      <div className="grid gap-4">
        {sortedSessions.map((session, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex flex-col space-y-4">
              {/* Session Date */}
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-[#4CD6B4]/20 text-[#4CD6B4] hover:bg-[#4CD6B4]/30">
                  <Calendar className="w-4 h-4 ml-2" />
                  {formatDate(session.session_date)}
                </Badge>
              </div>

              {/* Session Details */}
              <div className="grid gap-4 mt-2">
                {session.room_number && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400">رقم القاعة</p>
                      <p className="text-white">{session.room_number}</p>
                    </div>
                  </div>
                )}

                {session.procedure_type && (
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400">نوع الإجراء</p>
                      <p className="text-white">{session.procedure_type}</p>
                    </div>
                  </div>
                )}

                {session.decision && (
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400">القرار</p>
                      <p className="text-white whitespace-pre-wrap">{session.decision}</p>
                    </div>
                  </div>
                )}

                {session.next_session_date && (
                  <div className="flex items-start gap-3 mt-2">
                    <Clock className="w-4 h-4 text-[#4CD6B4] mt-1" />
                    <div>
                      <p className="text-sm text-[#4CD6B4]">الجلسة القادمة</p>
                      <p className="text-white flex items-center gap-2">
                        <ArrowRight className="w-4 h-4" />
                        {formatDate(session.next_session_date)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}