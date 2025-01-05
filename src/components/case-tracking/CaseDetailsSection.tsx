import { format } from "date-fns";
import { ar } from "date-fns/locale";

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
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-[#4CD6B4]">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">رمز القضية</p>
          <p className="text-white">{caseCode}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">الحالة</p>
          <p className="text-white">{status}</p>
        </div>
        {court && (
          <div>
            <p className="text-sm text-gray-400">المحكمة</p>
            <p className="text-white">{court}</p>
          </div>
        )}
        {caseType && (
          <div>
            <p className="text-sm text-gray-400">نوع القضية</p>
            <p className="text-white">{caseType}</p>
          </div>
        )}
        {filingDate && (
          <div>
            <p className="text-sm text-gray-400">تاريخ التقديم</p>
            <p className="text-white">{formatDate(filingDate)}</p>
          </div>
        )}
      </div>
    </div>
  );
}