import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { BasicInfoFields } from "./form-fields/BasicInfoFields";
import { AccountFields } from "./form-fields/AccountFields";
import { RoleField } from "./form-fields/RoleField";
import { ProfileFormData, ProfileFormProps } from "./types";

export function ProfileForm({ userId, initialData, onUpdate }: ProfileFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormData>({
    defaultValues: {
      full_name: initialData?.full_name || "",
      phone_number: initialData?.phone_number || "",
      email: initialData?.email || "",
      password: "",
      role: initialData?.role || "محامي",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // Create an object to store only the changed fields for profiles table
      const changedProfileFields: Partial<ProfileFormData> = {};
      
      // Compare each field with initial data and only include changed ones
      if (data.full_name !== initialData?.full_name) {
        changedProfileFields.full_name = data.full_name;
      }
      if (data.phone_number !== initialData?.phone_number) {
        changedProfileFields.phone_number = data.phone_number;
      }
      if (data.role !== initialData?.role) {
        changedProfileFields.role = data.role;
      }

      let hasChanges = false;

      // Update profile if there are changes
      if (Object.keys(changedProfileFields).length > 0) {
        console.log('Updating profile fields:', changedProfileFields);
        
        const { error: profileError } = await supabase
          .from("profiles")
          .update(changedProfileFields)
          .eq("id", userId);

        if (profileError) throw profileError;
        hasChanges = true;
      }

      // Update email if changed
      if (data.email && data.email !== initialData?.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: data.email,
        });

        if (emailError) throw emailError;
        hasChanges = true;
      }

      // Update password if provided
      if (data.password) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: data.password,
        });

        if (passwordError) throw passwordError;
        hasChanges = true;
      }

      if (hasChanges) {
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
        <BasicInfoFields form={form} />
        <AccountFields form={form} />
        <RoleField form={form} />
        
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