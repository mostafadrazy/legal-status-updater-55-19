import { StatusBadge } from "../../StatusBadge";

interface CaseInformationSectionProps {
  caseNumber: string;
  status: string;
  title: string;
  nextHearing: string;
  court?: string;
  caseType?: string;
  filingDate?: string;
}

export function CaseInformationSection({
  caseNumber,
  status,
  title,
  nextHearing,
  court,
  caseType,
  filingDate,
}: CaseInformationSectionProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-[#4CD6B4] font-medium">معلومات القضية</h4>
      <div className="grid grid-cols-2 gap-4 text-gray-300">
        <div>
          <p className="text-sm text-gray-400">رقم القضية</p>
          <p className="text-white">{caseNumber}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">الحالة</p>
          <StatusBadge status={status} />
        </div>
        <div>
          <p className="text-sm text-gray-400">العنوان</p>
          <p className="text-white">{title}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">الجلسة القادمة</p>
          <p className="text-white">{nextHearing || "غير محدد"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">المحكمة</p>
          <p className="text-white">{court || "غير محدد"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">نوع القضية</p>
          <p className="text-white">{caseType || "غير محدد"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">تاريخ التقديم</p>
          <p className="text-white">{filingDate || "غير محدد"}</p>
        </div>
      </div>
    </div>
  );
}