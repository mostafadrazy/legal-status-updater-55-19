interface LawyerInformationProps {
  lawyer?: {
    full_name: string | null;
    phone_number: string | null;
  };
}

export function LawyerInformation({ lawyer }: LawyerInformationProps) {
  return (
    <div className="border-t border-white/10 pt-4">
      <h4 className="text-lg font-medium text-[#4CD6B4] mb-3">معلومات المحامي</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">اسم المحامي</p>
          <p className="text-white">{lawyer?.full_name || "غير محدد"}</p>
        </div>
        {lawyer?.phone_number && (
          <div>
            <p className="text-sm text-gray-400">رقم الهاتف</p>
            <p className="text-white">{lawyer.phone_number}</p>
          </div>
        )}
      </div>
    </div>
  );
}