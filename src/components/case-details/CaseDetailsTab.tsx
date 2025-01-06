import { useState } from "react";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { EditCaseForm } from "./EditCaseForm";
import { CaseHeaderSection } from "./sections/CaseHeaderSection";
import { ClientInformationSection } from "./sections/ClientInformationSection";
import { OpposingPartySection } from "./sections/OpposingPartySection";

interface CaseDetailsTabProps {
  caseDetails: {
    id: string;
    case_number: string;
    title: string;
    status: string;
    next_hearing: string;
    client: string;
    client_phone?: string;
    client_email?: string;
    client_address?: string;
    court?: string;
    case_type?: string;
    opposing_party?: string;
    opposing_lawyer?: string;
    filing_date?: string;
  };
  onDelete: () => Promise<void>;
}

export function CaseDetailsTab({ caseDetails, onDelete }: CaseDetailsTabProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <EditCaseForm
        caseData={caseDetails}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-start">
        <Button
          variant="outline"
          size="sm"
          className="text-[#4CD6B4] border-[#4CD6B4] hover:bg-[#4CD6B4] hover:text-black transition-all duration-300"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="w-4 h-4 ml-2" />
          تعديل
        </Button>
      </div>

      <div className="grid gap-8">
        <CaseHeaderSection
          caseNumber={caseDetails.case_number}
          title={caseDetails.title}
          status={caseDetails.status}
          court={caseDetails.court}
          caseType={caseDetails.case_type}
          filingDate={caseDetails.filing_date}
        />

        <ClientInformationSection
          client={caseDetails.client}
          clientPhone={caseDetails.client_phone}
          clientEmail={caseDetails.client_email}
          clientAddress={caseDetails.client_address}
        />

        <OpposingPartySection
          opposingParty={caseDetails.opposing_party}
          opposingLawyer={caseDetails.opposing_lawyer}
        />

        <div className="flex justify-start pt-4">
          <Button
            variant="destructive"
            onClick={onDelete}
            className="bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            حذف القضية
          </Button>
        </div>
      </div>
    </div>
  );
}