import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(2, { message: "العنوان مطلوب" }),
  caseNumber: z.string().min(1, { message: "رقم القضية مطلوب" }),
  status: z.string(),
  nextHearing: z.string().optional(),
});

interface BasicCaseInfoFieldsProps {
  form: UseFormReturn<any>;
}

export function BasicCaseInfoFields({ form }: BasicCaseInfoFieldsProps) {
  return (
    <div className="space-y-4 p-6 rounded-lg bg-gradient-to-br from-white/5 to-transparent border border-white/10">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent mb-4">
        معلومات القضية الأساسية
      </h3>
      
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#4CD6B4]">العنوان</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                className="bg-white/5 border-white/10 text-[#4CD6B4] text-right"
                placeholder="أدخل عنوان القضية"
                dir="rtl"
              />
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
            <FormLabel className="text-[#4CD6B4]">رقم القضية</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                className="bg-white/5 border-white/10 text-[#4CD6B4] text-right"
                placeholder="أدخل رقم القضية"
                dir="rtl"
              />
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
            <FormLabel className="text-[#4CD6B4]">الحالة</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white/5 border-white/10 text-[#4CD6B4] text-right">
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
            <FormLabel className="text-[#4CD6B4]">الجلسة القادمة</FormLabel>
            <FormControl>
              <Input 
                type="date" 
                {...field} 
                className="bg-white/5 border-white/10 text-[#4CD6B4] text-right"
                dir="rtl"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}