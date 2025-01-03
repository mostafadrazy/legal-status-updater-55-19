import { User, Phone, Mail, MapPin } from "lucide-react";

interface ClientInformationSectionProps {
  client: string;
  clientPhone?: string;
  clientEmail?: string;
  clientAddress?: string;
}

export function ClientInformationSection({
  client,
  clientPhone,
  clientEmail,
  clientAddress,
}: ClientInformationSectionProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-semibold text-[#4CD6B4]">معلومات العميل</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
          <User className="w-5 h-5 text-[#4CD6B4]" />
          <div>
            <p className="text-sm text-gray-400">اسم العميل</p>
            <p className="text-white">{client}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
          <Phone className="w-5 h-5 text-[#4CD6B4]" />
          <div>
            <p className="text-sm text-gray-400">رقم الهاتف</p>
            <p className="text-white">{clientPhone || "غير محدد"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
          <Mail className="w-5 h-5 text-[#4CD6B4]" />
          <div>
            <p className="text-sm text-gray-400">البريد الإلكتروني</p>
            <p className="text-white">{clientEmail || "غير محدد"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
          <MapPin className="w-5 h-5 text-[#4CD6B4]" />
          <div>
            <p className="text-sm text-gray-400">العنوان</p>
            <p className="text-white">{clientAddress || "غير محدد"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}