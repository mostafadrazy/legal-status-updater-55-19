import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Settings as SettingsIcon, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SettingsFormData {
  full_name: string;
  phone_number: string;
}

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

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

      // Fetch avatar URL
      const { data: avatarData } = await supabase
        .storage
        .from('avatars')
        .getPublicUrl(`${user.id}`);

      if (avatarData) {
        setAvatarUrl(avatarData.publicUrl);
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

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploadingAvatar(true);
    try {
      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(`${user.id}`, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data } = await supabase.storage
        .from('avatars')
        .getPublicUrl(`${user.id}`);

      setAvatarUrl(data.publicUrl);

      toast({
        title: "تم تحديث الصورة الشخصية",
        description: "تم رفع الصورة بنجاح",
      });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast({
        variant: "destructive",
        title: "خطأ في رفع الصورة",
        description: "يرجى المحاولة مرة أخرى لاحقاً",
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-[#111]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
      </div>

      <Sidebar />
      
      <main className="flex-1 overflow-auto relative">
        <div className="p-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <SettingsIcon className="w-8 h-8 text-[#4CD6B4]" />
            <h1 className="text-3xl font-bold text-white">الإعدادات</h1>
          </div>

          <div className="glass-card p-6 rounded-xl space-y-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24 border-4 border-[#4CD6B4]/20">
                <AvatarImage src={avatarUrl || undefined} />
                <AvatarFallback className="bg-[#4CD6B4]/10 text-[#4CD6B4] text-xl">
                  {form.watch("full_name")?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex items-center gap-2">
                <label
                  htmlFor="avatar-upload"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#4CD6B4]/10 hover:bg-[#4CD6B4]/20 transition-colors cursor-pointer text-[#4CD6B4]"
                >
                  {isUploadingAvatar ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  تغيير الصورة الشخصية
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  disabled={isUploadingAvatar}
                />
              </div>
            </div>

            {/* Profile Form */}
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
          </div>
        </div>
      </main>
    </div>
  );
}