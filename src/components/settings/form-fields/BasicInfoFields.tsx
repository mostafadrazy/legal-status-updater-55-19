import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormData } from "../types";

interface BasicInfoFieldsProps {
  form: UseFormReturn<ProfileFormData>;
}

export function BasicInfoFields({ form }: BasicInfoFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="full_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">الاسم الكامل</FormLabel>
            <FormControl>
              <Input
                placeholder="أدخل اسمك الكامل"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">رقم الهاتف</FormLabel>
            <FormControl>
              <Input
                placeholder="أدخل رقم هاتفك"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}