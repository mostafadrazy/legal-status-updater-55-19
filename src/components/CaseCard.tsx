import { Calendar, User, Scale } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

interface CaseCardProps {
  caseNumber: string;
  title: string;
  status: string;
  nextHearing: string;
  client: string;
}

export function CaseCard({ caseNumber, title, status, nextHearing, client }: CaseCardProps) {
  return (
    <div className={cn(
      "group relative p-6 rounded-xl border border-[#9b87f5]/20",
      "bg-gradient-to-br from-[#1A1F2C] to-[#1A1F2C]/90",
      "hover:border-[#9b87f5]/40 transition-all duration-300",
      "animate-fade-in"
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#D6BCFA] transition-colors duration-300">
              {title}
            </h3>
            <p className="text-[#9b87f5] text-sm">رقم القضية: {caseNumber}</p>
          </div>
          <StatusBadge status={status} />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-300">
            <Calendar className="w-4 h-4 text-[#9b87f5]" />
            <span className="text-sm">الجلسة القادمة: {nextHearing}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <User className="w-4 h-4 text-[#9b87f5]" />
            <span className="text-sm">العميل: {client}</span>
          </div>
        </div>
        
        <button className={cn(
          "mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full",
          "border border-[#9b87f5] text-[#9b87f5]",
          "hover:bg-[#9b87f5] hover:text-white",
          "transform transition-all duration-300",
          "group-hover:scale-105"
        )}>
          <Scale className="w-4 h-4" />
          <span>عرض التفاصيل</span>
        </button>
      </div>
    </div>
  );
}