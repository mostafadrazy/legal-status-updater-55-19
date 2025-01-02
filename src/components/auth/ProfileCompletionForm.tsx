import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface ProfileFormData {
  full_name: string;
  phone_number: string;
}

export const ProfileCompletionForm = () => {
  const { register, handleSubmit } = useForm<ProfileFormData>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "خطأ",
          description: "يجب تسجيل الدخول أولاً",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: data.full_name,
          phone_number: data.phone_number,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        throw error;
      }

      toast({
        title: "تم بنجاح",
        description: "تم حفظ معلومات الملف الشخصي",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ المعلومات",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        أكمل معلومات ملفك الشخصي
      </h2>
      <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            الاسم الكامل
          </label>
          <Input
            {...register("full_name", { required: true })}
            className="w-full bg-transparent border-white/20 text-white"
            placeholder="أدخل اسمك الكامل"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            رقم الهاتف
          </label>
          <Input
            {...register("phone_number", { required: true })}
            type="tel"
            className="w-full bg-transparent border-white/20 text-white"
            placeholder="أدخل رقم هاتفك"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black"
        >
          حفظ المعلومات
        </Button>
      </form>
    </div>
  );
};