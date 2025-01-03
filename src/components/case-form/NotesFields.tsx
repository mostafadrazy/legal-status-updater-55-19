import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  initialNote: z.string().optional(),
});

type NotesFieldsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export const NotesFields = ({ form }: NotesFieldsProps) => {
  return (
    <FormField
      control={form.control}
      name="initialNote"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-300">ملاحظات أولية</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="أضف ملاحظات أولية للقضية..."
              className="h-32 resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};