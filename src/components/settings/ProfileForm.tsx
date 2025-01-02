import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ProfileFormData {
  full_name: string;
  phone_number: string;
}

interface ProfileFormProps {
  userId: string;
  initialData?: {
    full_name?: string;
    phone_number?: string;
  };
  onUpdate?: (data: ProfileFormData) => void;
}

export function ProfileForm({ userId, initialData, onUpdate }: ProfileFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormData>({
    defaultValues: {
      full_name: initialData?.full_name || "",
      phone_number: initialData?.phone_number || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // Create an object to store only the changed fields
      const changedFields: Partial<ProfileFormData> = {};
      
      // Compare each field with initial data and only include changed ones
      if (data.full_name !== initialData?.full_name) {
        changedFields.full_name = data.full_name;
      }
      if (data.phone_number !== initialData?.phone_number) {
        changedFields.phone_number = data.phone_number;
      }

      // Only proceed with update if there are changes
      if (Object.keys(changedFields).length > 0) {
        console.log('Updating fields:', changedFields);
        
        const { error } = await supabase
          .from("profiles")
          .update(changedFields)
          .eq("id", userId);

        if (error) throw error;

        toast({
          title: "تم تحديث الإعدادات بنجاح",
          description: "تم حفظ التغييرات الخاصة بك",
        });

        onUpdate?.(data);
      } else {
        toast({
          title: "لم يتم إجراء أي تغييرات",
          description: "لم يتم تعديل أي معلومات",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "خطأ في تحديث الإعدادات",
        description: "يرجى المحاولة مرة أخرى لاحقاً",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-[#4CD6B4] hover:bg-[#3bc4a2] text-black font-medium"
        >
          {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </form>
    </Form>
  );
}