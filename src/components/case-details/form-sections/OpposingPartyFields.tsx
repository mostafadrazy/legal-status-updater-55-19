import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  opposingParty: z.string().optional(),
  opposingLawyer: z.string().optional(),
});

interface OpposingPartyFieldsProps {
  form: UseFormReturn<any>;
}

export function OpposingPartyFields({ form }: OpposingPartyFieldsProps) {
  return (
    <div className="space-y-4 p-6 rounded-lg bg-gradient-to-br from-white/5 to-transparent border border-white/10">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent mb-4">
        معلومات الطرف المقابل
      </h3>

      <FormField
        control={form.control}
        name="opposingParty"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#4CD6B4]">الطرف المقابل</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                className="bg-white/5 border-white/10 text-[#4CD6B4] text-right"
                placeholder="أدخل اسم الطرف المقابل"
                dir="rtl"
              />
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
            <FormLabel className="text-[#4CD6B4]">محامي الطرف المقابل</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                className="bg-white/5 border-white/10 text-[#4CD6B4] text-right"
                placeholder="أدخل اسم محامي الطرف المقابل"
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