import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Settings as SettingsIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

interface SettingsFormData {
  full_name: string;
  phone_number: string;
}

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SettingsFormData>({
    defaultValues: {
      full_name: "",
      phone_number: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        form.reset({
          full_name: data.full_name || "",
          phone_number: data.phone_number || "",
        });
      }
    };

    fetchProfile();
  }, [user, form]);

  const onSubmit = async (data: SettingsFormData) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: data.full_name,
          phone_number: data.phone_number,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "تم تحديث الإعدادات بنجاح",
        description: "تم حفظ التغييرات الخاصة بك",
      });
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
    <div className="min-h-screen bg-[#111] text-white p-6">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4CD6B4]/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#4CD6B4]/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="w-8 h-8 text-[#4CD6B4]" />
          <h1 className="text-3xl font-bold">الإعدادات</h1>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم الكامل</FormLabel>
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
                    <FormLabel>رقم الهاتف</FormLabel>
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
                className="w-full bg-[#4CD6B4] hover:bg-[#3bc4a2] text-white"
              >
                {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}