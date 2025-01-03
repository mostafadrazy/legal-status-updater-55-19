import { useState } from "react";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { EditCaseForm } from "./EditCaseForm";
import { CaseHeaderSection } from "./sections/CaseHeaderSection";
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
  clientAddress?: string;
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
  clientAddress,
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
          client_address: clientAddress,
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
    <div className="space-y-8 py-4">
      <div className="flex justify-end">
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

      <CaseHeaderSection
        caseNumber={caseNumber}
        title={title}
        status={status}
        court={court}
        caseType={caseType}
        filingDate={filingDate}
      />

      <ClientInformationSection
        client={client}
        clientPhone={clientPhone}
        clientEmail={clientEmail}
        clientAddress={clientAddress}
      />

      <OpposingPartySection
        opposingParty={opposingParty}
        opposingLawyer={opposingLawyer}
      />

      <div className="flex justify-end pt-4">
        <Button
          variant="destructive"
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600"
        >
          حذف القضية
        </Button>
      </div>
    </div>
  );
}