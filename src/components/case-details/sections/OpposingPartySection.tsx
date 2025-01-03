import { Users, Scale } from "lucide-react";

interface OpposingPartySectionProps {
  opposingParty?: string;
  opposingLawyer?: string;
}

export function OpposingPartySection({
  opposingParty,
  opposingLawyer,
}: OpposingPartySectionProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-semibold text-[#4CD6B4]">معلومات الطرف المقابل</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
          <Users className="w-5 h-5 text-[#4CD6B4]" />
          <div>
            <p className="text-sm text-gray-400">الطرف المقابل</p>
            <p className="text-white">{opposingParty || "غير محدد"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
          <Scale className="w-5 h-5 text-[#4CD6B4]" />
          <div>
            <p className="text-sm text-gray-400">محامي الطرف المقابل</p>
            <p className="text-white">{opposingLawyer || "غير محدد"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}