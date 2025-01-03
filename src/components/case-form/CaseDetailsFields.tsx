import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  caseNumber: z.string().optional(),
  court: z.string().min(1, { message: "المحكمة مطلوبة" }),
  caseType: z.string().min(1, { message: "نوع القضية مطلوب" }),
  opposingParty: z.string().min(2, { message: "اسم الطرف المقابل مطلوب" }),
  opposingLawyer: z.string().optional(),
  filingDate: z.string().min(1, { message: "تاريخ التقديم مطلوب" }),
  hearingDate: z.string().optional(),
});

type CaseDetailsFieldsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export const CaseDetailsFields = ({ form }: CaseDetailsFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="caseNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300">رقم القضية (اختياري)</FormLabel>
            <FormControl>
              <Input placeholder="أدخل رقم القضية" {...field} />
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
            <FormLabel className="text-gray-300">المحكمة</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المحكمة" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="civil">المحكمة المدنية</SelectItem>
                <SelectItem value="criminal">المحكمة الجنائية</SelectItem>
                <SelectItem value="commercial">المحكمة التجارية</SelectItem>
                <SelectItem value="administrative">المحكمة الإدارية</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="caseType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300">نوع القضية</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع القضية" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="contract">نزاع عقود</SelectItem>
                <SelectItem value="property">نزاع عقاري</SelectItem>
                <SelectItem value="family">قضايا أسرية</SelectItem>
                <SelectItem value="labor">قضايا عمالية</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="opposingParty"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300">الطرف المقابل</FormLabel>
            <FormControl>
              <Input placeholder="أدخل اسم الطرف المقابل" {...field} />
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
            <FormLabel className="text-gray-300">محامي الطرف المقابل (اختياري)</FormLabel>
            <FormControl>
              <Input placeholder="أدخل اسم محامي الطرف المقابل" {...field} />
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
            <FormLabel className="text-gray-300">تاريخ التقديم</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="hearingDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300">تاريخ الجلسة (اختياري)</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};