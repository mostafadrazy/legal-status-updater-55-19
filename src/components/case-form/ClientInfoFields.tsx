import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  clientName: z.string().min(2, { message: "اسم العميل مطلوب" }),
  clientPhone: z.string().min(8, { message: "رقم الهاتف غير صالح" }),
  clientEmail: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
});

type ClientInfoFieldsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export const ClientInfoFields = ({ form }: ClientInfoFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="clientName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300">اسم العميل</FormLabel>
            <FormControl>
              <Input placeholder="أدخل اسم العميل" {...field} />
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
            <FormLabel className="text-gray-300">رقم الهاتف</FormLabel>
            <FormControl>
              <Input placeholder="أدخل رقم الهاتف" {...field} />
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
            <FormLabel className="text-gray-300">البريد الإلكتروني</FormLabel>
            <FormControl>
              <Input placeholder="أدخل البريد الإلكتروني" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};