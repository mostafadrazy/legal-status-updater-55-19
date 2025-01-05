import { User, Phone } from "lucide-react";

interface LawyerInformationProps {
  lawyer?: {
    full_name: string | null;
    phone_number: string | null;
  };
}

export function LawyerInformation({ lawyer }: LawyerInformationProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#4CD6B4]">معلومات المحامي</h3>
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
          <User className="w-5 h-5 text-[#4CD6B4]" />
          <div>
            <p className="text-sm text-gray-400">اسم المحامي</p>
            <p className="text-white">{lawyer?.full_name || "غير محدد"}</p>
          </div>
        </div>

        {lawyer?.phone_number && (
          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
            <Phone className="w-5 h-5 text-[#4CD6B4]" />
            <div>
              <p className="text-sm text-gray-400">رقم الهاتف</p>
              <p className="text-white">{lawyer.phone_number}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}