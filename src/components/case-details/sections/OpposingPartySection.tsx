interface OpposingPartySectionProps {
  opposingParty?: string;
  opposingLawyer?: string;
}

export function OpposingPartySection({
  opposingParty,
  opposingLawyer,
}: OpposingPartySectionProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-[#4CD6B4] font-medium">معلومات الطرف المقابل</h4>
      <div className="grid grid-cols-2 gap-4 text-gray-300">
        <div>
          <p className="text-sm text-gray-400">الطرف المقابل</p>
          <p className="text-white">{opposingParty || "غير محدد"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">محامي الطرف المقابل</p>
          <p className="text-white">{opposingLawyer || "غير محدد"}</p>
        </div>
      </div>
    </div>
  );
}