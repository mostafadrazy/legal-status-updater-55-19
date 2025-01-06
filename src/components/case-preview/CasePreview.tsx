import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { useTiltEffect } from "@/hooks/useTiltEffect";

interface CasePreviewProps {
  title: string;
  caseNumber: string;
  status: string;
  nextHearing: string;
  client: string;
  caseCode?: string;
  onClick?: () => void;
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
  const tiltRef = useTiltEffect({
    max: 10,
    scale: 1.02,
    speed: 800,
    glare: true,
    "max-glare": 0.2
  });

  return (
    <div
      ref={tiltRef}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 shadow-lg transition-all duration-300 hover:border-white/20 hover:shadow-xl"
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {caseCode && (
            <Badge variant="outline" className="border-white/20 text-[#4CD6B4]">
              {caseCode}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-400">رقم القضية: {caseNumber}</p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>الجلسة القادمة: {nextHearing}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <User className="h-4 w-4" />
            <span>العميل: {client}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={
              status === "مغلقة"
                ? "border-red-500/20 text-red-500"
                : status === "معلقة"
                ? "border-yellow-500/20 text-yellow-500"
                : "border-green-500/20 text-green-500"
            }
          >
            {status}
          </Badge>
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#4CD6B4]/0 via-[#4CD6B4]/5 to-[#4CD6B4]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}