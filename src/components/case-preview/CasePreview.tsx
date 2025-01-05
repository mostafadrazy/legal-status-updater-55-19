import { Calendar, User, Scale, QrCode, Copy } from "lucide-react";
import { StatusBadge } from "../StatusBadge";
import { toast } from "sonner";

interface CasePreviewProps {
  title: string;
  caseNumber: string;
  status: string;
  nextHearing: string;
  client: string;
  caseCode?: string;
  onClick: () => void;
}

export function CasePreview({
  title,
  caseNumber,
  status,
  nextHearing,
  client,
  caseCode,
  onClick
}: CasePreviewProps) {
  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (caseCode) {
      navigator.clipboard.writeText(caseCode);
      toast.success('تم نسخ رمز القضية');
    }
  };

  return (
    <div 
      onClick={onClick}
      className="relative p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#4CD6B4]/5 to-transparent rounded-xl" />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-[#4CD6B4] text-sm">رقم القضية: {caseNumber}</p>
            {caseCode && (
              <div className="flex items-center gap-2 mt-1">
                <QrCode className="w-4 h-4 text-[#4CD6B4]" />
                <span className="text-sm text-gray-400">{caseCode}</span>
                <button
                  onClick={handleCopyCode}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Copy className="w-3 h-3 text-[#4CD6B4]" />
                </button>
              </div>
            )}
          </div>
          <StatusBadge status={status} />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-300">
            <Calendar className="w-4 h-4 text-[#4CD6B4]" />
            <span className="text-sm">الجلسة القادمة: {nextHearing || "غير محدد"}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <User className="w-4 h-4 text-[#4CD6B4]" />
            <span className="text-sm">العميل: {client}</span>
          </div>
        </div>
        
        <button 
          className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#4CD6B4] text-[#4CD6B4] hover:bg-[#4CD6B4] hover:text-black transition-all duration-300"
        >
          <Scale className="w-4 h-4" />
          <span>عرض التفاصيل</span>
        </button>
      </div>
    </div>
  );
}