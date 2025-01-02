interface ClientInformationSectionProps {
  client: string;
  clientPhone?: string;
  clientEmail?: string;
}

export function ClientInformationSection({
  client,
  clientPhone,
  clientEmail,
}: ClientInformationSectionProps) {
  return (
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
      </div>
    </div>
  );
}