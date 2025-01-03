import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BasicCaseInfoFields } from "./form-sections/BasicCaseInfoFields";
import { ClientInfoFields } from "./form-sections/ClientInfoFields";
import { CourtInfoFields } from "./form-sections/CourtInfoFields";
import { OpposingPartyFields } from "./form-sections/OpposingPartyFields";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, { message: "العنوان مطلوب" }),
  caseNumber: z.string().min(1, { message: "رقم القضية مطلوب" }),
  status: z.string(),
  nextHearing: z.string().optional(),
  client: z.string().min(2, { message: "اسم العميل مطلوب" }),
  clientPhone: z.string().optional(),
  clientEmail: z.string().email({ message: "البريد الإلكتروني غير صالح" }).optional(),
  clientAddress: z.string().optional(),
  court: z.string().optional(),
  caseType: z.string().optional(),
  filingDate: z.string().optional(),
  opposingParty: z.string().optional(),
  opposingLawyer: z.string().optional(),
});

interface EditCaseFormProps {
  caseData: any;
  onClose: () => void;
}

export function EditCaseForm({ caseData, onClose }: EditCaseFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: caseData.title,
      caseNumber: caseData.case_number,
      status: caseData.status,
      nextHearing: caseData.next_hearing,
      client: caseData.client,
      clientPhone: caseData.client_phone,
      clientEmail: caseData.client_email,
      clientAddress: caseData.client_address,
      court: caseData.court,
      caseType: caseData.case_type,
      filingDate: caseData.filing_date,
      opposingParty: caseData.opposing_party,
      opposingLawyer: caseData.opposing_lawyer,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const changedFields: Record<string, any> = {};

    if (values.title !== caseData.title) changedFields.title = values.title;
    if (values.caseNumber !== caseData.case_number) changedFields.case_number = values.caseNumber;
    if (values.status !== caseData.status) changedFields.status = values.status;
    if (values.nextHearing !== caseData.next_hearing) changedFields.next_hearing = values.nextHearing;
    if (values.client !== caseData.client) changedFields.client = values.client;
    if (values.clientPhone !== caseData.client_phone) changedFields.client_phone = values.clientPhone;
    if (values.clientEmail !== caseData.client_email) changedFields.client_email = values.clientEmail;
    if (values.clientAddress !== caseData.client_address) changedFields.client_address = values.clientAddress;
    if (values.court !== caseData.court) changedFields.court = values.court;
    if (values.caseType !== caseData.case_type) changedFields.case_type = values.caseType;
    if (values.opposingParty !== caseData.opposing_party) changedFields.opposing_party = values.opposingParty;
    if (values.opposingLawyer !== caseData.opposing_lawyer) changedFields.opposing_lawyer = values.opposingLawyer;
    if (values.filingDate !== caseData.filing_date) changedFields.filing_date = values.filingDate;

    if (Object.keys(changedFields).length === 0) {
      toast.info("لم يتم إجراء أي تغييرات");
      onClose();
      return;
    }

    const { error } = await supabase
      .from('cases')
      .update(changedFields)
      .eq('id', caseData.id);

    if (error) {
      toast.error("فشل تحديث القضية");
      return;
    }

    toast.success("تم تحديث القضية بنجاح");
    queryClient.invalidateQueries({ queryKey: ['cases'] });
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <BasicCaseInfoFields form={form} />
            <ClientInfoFields form={form} />
          </div>
          <div className="space-y-6">
            <CourtInfoFields form={form} />
            <OpposingPartyFields form={form} />
          </div>
        </div>

        <div className="flex justify-end space-x-2 rtl:space-x-reverse">
          <Button 
            type="submit" 
            className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black"
          >
            حفظ التغييرات
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="hover:bg-white/5"
          >
            إلغاء
          </Button>
        </div>
      </form>
    </Form>
  );
}