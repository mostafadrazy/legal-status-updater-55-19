import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  caseValue: z.string().optional(),
  caseDescription: z.string().optional(),
  additionalNotes: z.string().optional(),
  priority: z.enum(["high", "medium", "low"]).optional(),
  tags: z.array(z.string()).optional(),
});

type AdditionalInfoFieldsProps = {
  form: UseFormReturn<any>;
};

export const AdditionalInfoFields = ({ form }: AdditionalInfoFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="caseValue"
        render={({ field }) => (
          <FormItem>
            <FormLabel>قيمة القضية</FormLabel>
            <FormControl>
              <Input placeholder="أدخل قيمة القضية" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="caseDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>وصف القضية</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="أدخل وصفاً تفصيلياً للقضية..."
                className="h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="priority"
        render={({ field }) => (
          <FormItem>
            <FormLabel>الأولوية</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="حدد أولوية القضية" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="high">عالية</SelectItem>
                <SelectItem value="medium">متوسطة</SelectItem>
                <SelectItem value="low">منخفضة</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additionalNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ملاحظات إضافية</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="أي ملاحظات أو تفاصيل إضافية..."
                className="h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};