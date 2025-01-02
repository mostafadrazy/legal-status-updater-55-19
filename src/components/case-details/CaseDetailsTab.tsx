import { useState } from "react";
import { StatusBadge } from "../StatusBadge";
import { EditCaseForm } from "./EditCaseForm";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

interface CaseDetailsTabProps {
  id: string;
  caseNumber: string;
  title: string;
  status: string;
  nextHearing: string;
  client: string;
  clientPhone?: string;
  clientEmail?: string;
  clientAddress?: string;
  court?: string;
  caseType?: string;
  opposingParty?: string;
  opposingLawyer?: string;
  filingDate?: string;
  onDelete: () => Promise<void>;
}

export function CaseDetailsTab({ 
  id,
  caseNumber, 
  title, 
  status, 
  nextHearing, 
  client,
  clientPhone,
  clientEmail,
  clientAddress,
  court,
  caseType,
  opposingParty,
  opposingLawyer,
  filingDate,
  onDelete 
}: CaseDetailsTabProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <EditCaseForm
        caseData={{
          id,
          title,
          case_number: caseNumber,
          status,
          next_hearing: nextHearing,
          client,
          client_phone: clientPhone,
          client_email: clientEmail,
          client_address: clientAddress,
          court,
          case_type: caseType,
          opposing_party: opposingParty,
          opposing_lawyer: opposingLawyer,
          filing_date: filingDate,
        }}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h4 className="text-[#4CD6B4] font-medium">معلومات القضية</h4>
          <Button
            variant="outline"
            size="sm"
            className="text-[#4CD6B4] border-[#4CD6B4]"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="w-4 h-4 mr-2" />
            تعديل
          </Button>
        </div>
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

      <div className="space-y-2">
        <h4 className="text-[#4CD6B4] font-medium">معلومات العميل</h4>
        <div className="grid grid-cols-2 gap-4 text-gray-300">
          <div>
            <p className="text-sm text-gray-400">اسم العميل</p>
            <p className="text-white">{client}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">رقم الهاتف</p>
            <p className="text-white">{clientPhone || "غير محدد"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">البريد الإلكتروني</p>
            <p className="text-white">{clientEmail || "غير محدد"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">العنوان</p>
            <p className="text-white">{clientAddress || "غير محدد"}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-[#4CD6B4] font-medium">معلومات الطرف المقابل</h4>
        <div className="grid grid-cols-2 gap-4 text-gray-300">
          <div>
            <p className="text-sm text-gray-400">الطرف المقابل</p>
            <p className="text-white">{opposingParty || "غير محدد"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">محامي الطرف المقابل</p>
            <p className="text-white">{opposingLawyer || "غير محدد"}</p>
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