import { User, Phone, Mail } from "lucide-react";

interface ClientInformationProps {
  client: string;
  clientPhone?: string | null;
  clientEmail?: string | null;
}

export function ClientInformation({ client, clientPhone, clientEmail }: ClientInformationProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#4CD6B4]">معلومات العميل</h3>
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
          <User className="w-5 h-5 text-[#4CD6B4]" />
          <div>
            <p className="text-sm text-gray-400">اسم العميل</p>
            <p className="text-white">{client}</p>
          </div>
        </div>

        {clientPhone && (
          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
            <Phone className="w-5 h-5 text-[#4CD6B4]" />
            <div>
              <p className="text-sm text-gray-400">رقم الهاتف</p>
              <p className="text-white">{clientPhone}</p>
            </div>
          </div>
        )}

        {clientEmail && (
          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
            <Mail className="w-5 h-5 text-[#4CD6B4]" />
            <div>
              <p className="text-sm text-gray-400">البريد الإلكتروني</p>
              <p className="text-white">{clientEmail}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}