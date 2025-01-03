import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  client: z.string().min(2, { message: "اسم العميل مطلوب" }),
  clientPhone: z.string().optional(),
  clientEmail: z.string().email({ message: "البريد الإلكتروني غير صالح" }).optional(),
  clientAddress: z.string().optional(),
});

interface ClientInfoFieldsProps {
  form: UseFormReturn<any>;
}

export function ClientInfoFields({ form }: ClientInfoFieldsProps) {
  return (
    <div className="space-y-4 p-6 rounded-lg bg-gradient-to-br from-white/5 to-transparent border border-white/10">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent mb-4">
        معلومات العميل
      </h3>

      <FormField
        control={form.control}
        name="client"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#4CD6B4]">اسم العميل</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                className="bg-white/5 border-white/10 text-[#4CD6B4] text-right"
                placeholder="أدخل اسم العميل"
                dir="rtl"
              />
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
            <FormLabel className="text-[#4CD6B4]">رقم الهاتف</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                className="bg-white/5 border-white/10 text-[#4CD6B4] text-right"
                placeholder="أدخل رقم الهاتف"
                dir="rtl"
              />
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
            <FormLabel className="text-[#4CD6B4]">البريد الإلكتروني</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                className="bg-white/5 border-white/10 text-[#4CD6B4] text-right"
                placeholder="أدخل البريد الإلكتروني"
                dir="rtl"
              />
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
            <FormLabel className="text-[#4CD6B4]">العنوان</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                className="bg-white/5 border-white/10 text-[#4CD6B4] text-right"
                placeholder="أدخل العنوان"
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