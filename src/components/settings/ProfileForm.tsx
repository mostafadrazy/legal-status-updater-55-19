import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface ProfileFormData {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
  role: string;
}

interface ProfileFormProps {
  userId: string;
  initialData?: {
    full_name?: string;
    phone_number?: string;
    email?: string;
    role?: string;
  };
  onUpdate?: (data: ProfileFormData) => void;
}

export function ProfileForm({ userId, initialData, onUpdate }: ProfileFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">كلمة المرور</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور الجديدة"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">الدور</FormLabel>
              <FormControl>
                <Input
                  placeholder="أدخل دورك"
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