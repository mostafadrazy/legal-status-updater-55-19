import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Scale, Calendar, FileText } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

interface CaseDetailsSectionProps {
  title: string;
  caseCode: string;
  status: string;
  court?: string | null;
  caseType?: string | null;
  filingDate?: string | null;
}

export function CaseDetailsSection({ 
  title, 
  caseCode, 
  status,
  court,
  caseType,
  filingDate
}: CaseDetailsSectionProps) {
  const formatDate = (date: string | null) => {
    if (!date) return "غير محدد";
    return format(new Date(date), 'dd MMMM yyyy', { locale: ar });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <div className="flex items-center gap-2 text-[#4CD6B4]">
            <Scale className="w-5 h-5" />
            <span className="text-lg">رمز القضية: {caseCode}</span>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <FileText className="w-5 h-5 text-[#4CD6B4]" />
          <div>
            <p className="text-sm text-gray-400">المحكمة</p>
            <p className="text-white">{court || "غير محدد"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <FileText className="w-5 h-5 text-[#4CD6B4]" />
          <div>
            <p className="text-sm text-gray-400">نوع القضية</p>
            <p className="text-white">{caseType || "غير محدد"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <Calendar className="w-5 h-5 text-[#4CD6B4]" />
          <div>
            <p className="text-sm text-gray-400">تاريخ التقديم</p>
            <p className="text-white">{formatDate(filingDate)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}