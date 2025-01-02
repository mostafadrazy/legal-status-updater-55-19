import { useState } from "react";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { EditCaseForm } from "./EditCaseForm";
import { CaseInformationSection } from "./sections/CaseInformationSection";
import { ClientInformationSection } from "./sections/ClientInformationSection";
import { OpposingPartySection } from "./sections/OpposingPartySection";

interface CaseDetailsTabProps {
  id: string;
  caseNumber: string;
  title: string;
  status: string;
  nextHearing: string;
  client: string;
  clientPhone?: string;
  clientEmail?: string;
  court?: string;
  caseType?: string;
  opposingParty?: string;
  opposingLawyer?: string;
  filingDate?: string;
  onDelete: () => Promise<void>;
}

export function CaseDetailsTab({ 
  id,
  caseNumber, 
  title, 
  status, 
  nextHearing, 
  client,
  clientPhone,
  clientEmail,
  court,
  caseType,
  opposingParty,
  opposingLawyer,
  filingDate,
  onDelete 
}: CaseDetailsTabProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <EditCaseForm
        caseData={{
          id,
          title,
          case_number: caseNumber,
          status,
          next_hearing: nextHearing,
          client,
          client_phone: clientPhone,
          client_email: clientEmail,
          court,
          case_type: caseType,
          opposing_party: opposingParty,
          opposing_lawyer: opposingLawyer,
          filing_date: filingDate,
        }}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="space-y-6 py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1" />
        <Button
          variant="outline"
          size="sm"
          className="text-[#4CD6B4] border-[#4CD6B4]"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="w-4 h-4 mr-2" />
          تعديل
        </Button>
      </div>

      <CaseInformationSection
        caseNumber={caseNumber}
        status={status}
        title={title}
        nextHearing={nextHearing}
        court={court}
        caseType={caseType}
        filingDate={filingDate}
      />

      <ClientInformationSection
        client={client}
        clientPhone={clientPhone}
        clientEmail={clientEmail}
      />

      <OpposingPartySection
        opposingParty={opposingParty}
        opposingLawyer={opposingLawyer}
      />

      <div className="flex justify-end space-x-2">
        <button
          onClick={onDelete}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          حذف القضية
        </button>
      </div>
    </div>
  );
}