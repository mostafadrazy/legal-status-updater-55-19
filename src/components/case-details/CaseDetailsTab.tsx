import { StatusBadge } from "../StatusBadge";

interface CaseDetailsTabProps {
  caseNumber: string;
  title: string;
  status: string;
  nextHearing: string;
  client: string;
  onDelete: () => Promise<void>;
}

export function CaseDetailsTab({ 
  caseNumber, 
  title, 
  status, 
  nextHearing, 
  client,
  onDelete 
}: CaseDetailsTabProps) {
  return (
    <div className="space-y-6 py-4">
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
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-[#4CD6B4] font-medium">معلومات العميل</h4>
        <div className="grid grid-cols-2 gap-4 text-gray-300">
          <div>
            <p className="text-sm text-gray-400">اسم العميل</p>
            <p className="text-white">{client}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={onDelete}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          حذف القضية
        </button>
      </div>
    </div>
  );
}