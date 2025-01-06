import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormData } from "../types";

interface RoleFieldProps {
  form: UseFormReturn<ProfileFormData>;
}

export function RoleField({ form }: RoleFieldProps) {
  return (
    <FormField
      control={form.control}
      name="role"
      render={({ field }) => (
        <FormItem className="text-right">
          <FormLabel className="text-white">الدور</FormLabel>
          <FormControl>
            <Input
              placeholder="أدخل دورك"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-right"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}