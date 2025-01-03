import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  court: z.string().optional(),
  caseType: z.string().optional(),
  filingDate: z.string().optional(),
});

interface CourtInfoFieldsProps {
  form: UseFormReturn<any>;
}

export function CourtInfoFields({ form }: CourtInfoFieldsProps) {
  return (
    <div className="space-y-4 p-6 rounded-lg bg-gradient-to-br from-white/5 to-transparent border border-white/10">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent mb-4">
        معلومات المحكمة
      </h3>

      <FormField
        control={form.control}
        name="court"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#4CD6B4]">المحكمة</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white/5 border-white/10 text-right text-[#4CD6B4]">
                  <SelectValue placeholder="اختر المحكمة" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="المحكمة المدنية">المحكمة المدنية</SelectItem>
                <SelectItem value="المحكمة الجنائية">المحكمة الجنائية</SelectItem>
                <SelectItem value="المحكمة التجارية">المحكمة التجارية</SelectItem>
                <SelectItem value="المحكمة الإدارية">المحكمة الإدارية</SelectItem>
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
            <FormLabel className="text-[#4CD6B4]">نوع القضية</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white/5 border-white/10 text-right text-[#4CD6B4]">
                  <SelectValue placeholder="اختر نوع القضية" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="نزاع عقود">نزاع عقود</SelectItem>
                <SelectItem value="نزاع عقاري">نزاع عقاري</SelectItem>
                <SelectItem value="قضايا أسرية">قضايا أسرية</SelectItem>
                <SelectItem value="قضايا عمالية">قضايا عمالية</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="filingDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#4CD6B4]">تاريخ التقديم</FormLabel>
            <FormControl>
              <Input 
                type="date" 
                {...field} 
                className="bg-white/5 border-white/10 text-right text-[#4CD6B4]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}