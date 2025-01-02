import { Calendar, User, Scale } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState } from "react";

interface CaseCardProps {
  caseNumber: string;
  title: string;
  status: string;
  nextHearing: string;
  client: string;
}

export function CaseCard({ caseNumber, title, status, nextHearing, client }: CaseCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="relative p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4CD6B4]/5 to-transparent rounded-xl" />
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
              <p className="text-[#4CD6B4] text-sm">رقم القضية: {caseNumber}</p>
            </div>
            <StatusBadge status={status} />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-300">
              <Calendar className="w-4 h-4 text-[#4CD6B4]" />
              <span className="text-sm">الجلسة القادمة: {nextHearing}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <User className="w-4 h-4 text-[#4CD6B4]" />
              <span className="text-sm">العميل: {client}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setShowDetails(true)}
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#4CD6B4] text-[#4CD6B4] hover:bg-[#4CD6B4] hover:text-black transition-all duration-300"
          >
            <Scale className="w-4 h-4" />
            <span>عرض التفاصيل</span>
          </button>
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="bg-[#1F1F1F] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">تفاصيل القضية</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <h4 className="text-[#4CD6B4] font-medium">معلومات القضية</h4>
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
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[#4CD6B4] font-medium">معلومات العميل</h4>
              <div className="grid grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p className="text-sm text-gray-400">اسم العميل</p>
                  <p className="text-white">{client}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}