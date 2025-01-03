import { Scale, Calendar, FileText } from "lucide-react";
import { StatusBadge } from "../../StatusBadge";

interface CaseHeaderSectionProps {
  caseNumber: string;
  title: string;
  status: string;
  court?: string;
  caseType?: string;
  filingDate?: string;
}

export function CaseHeaderSection({
  caseNumber,
  title,
  status,
  court,
  caseType,
  filingDate,
}: CaseHeaderSectionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <div className="flex items-center gap-2 text-[#4CD6B4]">
            <Scale className="w-4 h-4" />
            <span>رقم القضية: {caseNumber}</span>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
          <FileText className="w-5 h-5 text-[#4CD6B4]" />
          <div className="flex-1">
            <p className="text-sm text-gray-400">المحكمة</p>
            <p className="text-white">{court || "غير محدد"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
          <FileText className="w-5 h-5 text-[#4CD6B4]" />
          <div className="flex-1">
            <p className="text-sm text-gray-400">نوع القضية</p>
            <p className="text-white">{caseType || "غير محدد"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
          <Calendar className="w-5 h-5 text-[#4CD6B4]" />
          <div className="flex-1">
            <p className="text-sm text-gray-400">تاريخ التقديم</p>
            <p className="text-white">{filingDate || "غير محدد"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}