import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

const formSchema = z.object({
  caseNumber: z.string().min(1, { message: "رقم القضية مطلوب" }),
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
  const [showCustomCourt, setShowCustomCourt] = useState(false);
  const [showCustomCaseType, setShowCustomCaseType] = useState(false);

  return (
    <>
      <FormField
        control={form.control}
        name="caseNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300">رقم القضية</FormLabel>
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
            <Select 
              onValueChange={(value) => {
                setShowCustomCourt(value === "أخرى");
                field.onChange(value);
              }} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المحكمة" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="المحكمة المدنية">المحكمة المدنية</SelectItem>
                <SelectItem value="المحكمة الجنائية">المحكمة الجنائية</SelectItem>
                <SelectItem value="المحكمة التجارية">المحكمة التجارية</SelectItem>
                <SelectItem value="المحكمة الإدارية">المحكمة الإدارية</SelectItem>
                <SelectItem value="أخرى">أخرى</SelectItem>
              </SelectContent>
            </Select>
            {showCustomCourt && (
              <Input
                placeholder="أدخل اسم المحكمة"
                className="mt-2"
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
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
            <Select 
              onValueChange={(value) => {
                setShowCustomCaseType(value === "أخرى");
                field.onChange(value);
              }} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع القضية" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="نزاع عقود">نزاع عقود</SelectItem>
                <SelectItem value="نزاع عقاري">نزاع عقاري</SelectItem>
                <SelectItem value="قضايا أسرية">قضايا أسرية</SelectItem>
                <SelectItem value="قضايا عمالية">قضايا عمالية</SelectItem>
                <SelectItem value="أخرى">أخرى</SelectItem>
              </SelectContent>
            </Select>
            {showCustomCaseType && (
              <Input
                placeholder="أدخل نوع القضية"
                className="mt-2"
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
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
            <FormLabel className="text-gray-300">محامي الطرف المقابل</FormLabel>
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
            <FormLabel className="text-gray-300">تاريخ الجلسة</FormLabel>
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