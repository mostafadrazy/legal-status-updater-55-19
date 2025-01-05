interface ClientInformationProps {
  client: string;
  clientPhone?: string | null;
  clientEmail?: string | null;
}

export function ClientInformation({ client, clientPhone, clientEmail }: ClientInformationProps) {
  return (
    <div className="border-t border-white/10 pt-4">
      <h4 className="text-lg font-medium text-[#4CD6B4] mb-3">معلومات العميل</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">اسم العميل</p>
          <p className="text-white">{client}</p>
        </div>
        {clientPhone && (
          <div>
            <p className="text-sm text-gray-400">رقم الهاتف</p>
            <p className="text-white">{clientPhone}</p>
          </div>
        )}
        {clientEmail && (
          <div>
            <p className="text-sm text-gray-400">البريد الإلكتروني</p>
            <p className="text-white">{clientEmail}</p>
          </div>
        )}
      </div>
    </div>
  );
}