import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { ClientInfoFields } from "./case-form/ClientInfoFields";
import { CaseDetailsFields } from "./case-form/CaseDetailsFields";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const formSchema = z.object({
  clientName: z.string().min(2, { message: "اسم العميل مطلوب" }),
  clientPhone: z.string().min(8, { message: "رقم الهاتف غير صالح" }),
  clientEmail: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  caseNumber: z.string().optional(),
  court: z.string().min(1, { message: "المحكمة مطلوبة" }),
  caseType: z.string().min(1, { message: "نوع القضية مطلوب" }),
  opposingParty: z.string().min(2, { message: "اسم الطرف المقابل مطلوب" }),
  filingDate: z.string().min(1, { message: "تاريخ التقديم مطلوب" }),
  hearingDate: z.string().optional(),
  additionalInfo: z.string().optional(),
});

interface NewCaseFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewCaseForm = ({ open, onOpenChange }: NewCaseFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      caseNumber: "",
      court: "",
      caseType: "",
      opposingParty: "",
      filingDate: "",
      hearingDate: "",
      additionalInfo: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const caseId = `CASE-${Date.now()}`;
    console.log("New Case Created:", { ...values, caseId });
    toast.success("تم إنشاء القضية بنجاح");
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-6">إضافة قضية جديدة</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ClientInfoFields form={form} />
              <CaseDetailsFields form={form} />
            </div>
            <Button type="submit" className="w-full">إنشاء القضية</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCaseForm;