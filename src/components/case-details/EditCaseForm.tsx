import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

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
  opposingParty: z.string().optional(),
  opposingLawyer: z.string().optional(),
  filingDate: z.string().optional(),
});

interface EditCaseFormProps {
  caseData: any;
  onClose: () => void;
}

export function EditCaseForm({ caseData, onClose }: EditCaseFormProps) {
  const { toast } = useToast();
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
      opposingParty: caseData.opposing_party,
      opposingLawyer: caseData.opposing_lawyer,
      filingDate: caseData.filing_date,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { error } = await supabase
      .from('cases')
      .update({
        title: values.title,
        case_number: values.caseNumber,
        status: values.status,
        next_hearing: values.nextHearing,
        client: values.client,
        client_phone: values.clientPhone,
        client_email: values.clientEmail,
        client_address: values.clientAddress,
        court: values.court,
        case_type: values.caseType,
        opposing_party: values.opposingParty,
        opposing_lawyer: values.opposingLawyer,
        filing_date: values.filingDate,
      })
      .eq('id', caseData.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update case", variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Case updated successfully" });
    queryClient.invalidateQueries({ queryKey: ['cases'] });
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>العنوان</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="caseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم القضية</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الحالة</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="جاري">جاري</SelectItem>
                    <SelectItem value="معلق">معلق</SelectItem>
                    <SelectItem value="مغلق">مغلق</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nextHearing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الجلسة القادمة</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم العميل</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهاتف</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>العنوان</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="court"
            render={({ field }) => (
              <FormItem>
                <FormLabel>المحكمة</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="caseType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نوع القضية</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="opposingParty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الطرف المقابل</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="opposingLawyer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>محامي الطرف المقابل</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="filingDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تاريخ التقديم</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="submit" className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black">
            حفظ التغييرات
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            إلغاء
          </Button>
        </div>
      </form>
    </Form>
  );
}