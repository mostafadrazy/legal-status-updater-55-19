import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { ClientInfoFields } from "./case-form/ClientInfoFields";
import { CaseDetailsFields } from "./case-form/CaseDetailsFields";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DocumentUploadFields } from "./case-form/DocumentUploadFields";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const formSchema = z.object({
  clientName: z.string().min(2, { message: "اسم العميل مطلوب" }),
  clientPhone: z.string().min(8, { message: "رقم الهاتف غير صالح" }),
  clientEmail: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  clientAddress: z.string().optional(),
  caseNumber: z.string().min(1, { message: "رقم القضية مطلوب" }),
  court: z.string().min(1, { message: "المحكمة مطلوبة" }),
  caseType: z.string().min(1, { message: "نوع القضية مطلوب" }),
  opposingParty: z.string().min(2, { message: "اسم الطرف المقابل مطلوب" }),
  opposingLawyer: z.string().optional(),
  filingDate: z.string().min(1, { message: "تاريخ التقديم مطلوب" }),
  hearingDate: z.string().optional(),
  additionalInfo: z.string().optional(),
  documents: z.array(
    z.object({
      file: z.instanceof(File)
        .refine(file => file.size <= MAX_FILE_SIZE, 'حجم الملف يجب أن يكون أقل من 5 ميجابايت')
        .refine(file => ACCEPTED_FILE_TYPES.includes(file.type), 'نوع الملف غير مدعوم'),
      type: z.string(),
      description: z.string().optional(),
    })
  ).optional(),
});

interface NewCaseFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewCaseForm = ({ open, onOpenChange }: NewCaseFormProps) => {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      clientAddress: "",
      caseNumber: "",
      court: "",
      caseType: "",
      opposingParty: "",
      opposingLawyer: "",
      filingDate: "",
      hearingDate: "",
      additionalInfo: "",
      documents: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!session?.user) {
        toast.error("يجب تسجيل الدخول لإنشاء قضية");
        return;
      }

      // Create the case with all fields
      const { data: caseData, error: caseError } = await supabase.from('cases').insert({
        title: values.opposingParty,
        case_number: values.caseNumber,
        client: values.clientName,
        client_phone: values.clientPhone,
        client_email: values.clientEmail,
        client_address: values.clientAddress,
        court: values.court,
        case_type: values.caseType,
        opposing_party: values.opposingParty,
        opposing_lawyer: values.opposingLawyer,
        filing_date: values.filingDate,
        next_hearing: values.hearingDate || null,
        user_id: session.user.id,
        status: 'جاري'
      }).select().single();

      if (caseError) throw caseError;

      // Handle document uploads
      if (values.documents && values.documents.length > 0) {
        for (const doc of values.documents) {
          const fileExt = doc.file.name.split('.').pop();
          const filePath = `${session.user.id}/${crypto.randomUUID()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('case-documents')
            .upload(filePath, doc.file);

          if (uploadError) throw uploadError;

          const { error: docError } = await supabase.from('case_documents').insert({
            case_id: caseData.id,
            file_name: doc.file.name,
            file_path: filePath,
            file_type: doc.file.type,
            description: doc.description,
            user_id: session.user.id
          });

          if (docError) throw docError;
        }
      }

      toast.success("تم إنشاء القضية بنجاح");
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('Error creating case:', error);
      toast.error("حدث خطأ أثناء إنشاء القضية");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#111] to-[#1A1A1A] border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-6 bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
            إضافة قضية جديدة
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="space-y-6 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <h3 className="text-lg font-semibold text-[#4CD6B4]">معلومات العميل</h3>
                  <ClientInfoFields form={form} />
                </div>
                <div className="space-y-6 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <h3 className="text-lg font-semibold text-[#4CD6B4]">المستندات والمرفقات</h3>
                  <DocumentUploadFields form={form} />
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-6 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <h3 className="text-lg font-semibold text-[#4CD6B4]">تفاصيل القضية</h3>
                  <CaseDetailsFields form={form} />
                </div>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black font-medium px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              إنشاء القضية
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCaseForm;