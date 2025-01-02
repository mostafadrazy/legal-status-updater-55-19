import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AuthChangeEvent } from "@supabase/supabase-js";

interface AuthProps {
  view?: "sign_in" | "sign_up";
}

interface ProfileFormData {
  full_name: string;
  phone_number: string;
}

export const Auth = ({ view = "sign_in" }: AuthProps) => {
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit } = useForm<ProfileFormData>();

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

      console.log('Updating profile for user:', user.id);
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: data.full_name,
          phone_number: data.phone_number,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Profile update error:', error);
        throw error;
      }

      console.log('Profile updated successfully');
      toast({
        title: "تم بنجاح",
        description: "تم حفظ معلومات الملف الشخصي",
      });
      
      setShowProfileCompletion(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ المعلومات",
        variant: "destructive",
      });
    }
  };

  if (showProfileCompletion) {
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
  }

  return (
    <div className="w-full">
      <SupabaseAuth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#4CD6B4",
                brandAccent: "#3BC5A3",
                brandButtonText: "black",
                defaultButtonBackground: "transparent",
                defaultButtonBackgroundHover: "#ffffff10",
                defaultButtonBorder: "#ffffff20",
                defaultButtonText: "white",
                dividerBackground: "#ffffff20",
                inputBackground: "transparent",
                inputBorder: "#ffffff20",
                inputBorderHover: "#ffffff40",
                inputBorderFocus: "#4CD6B4",
                inputText: "white",
                inputLabelText: "white",
                inputPlaceholder: "#ffffff80",
              },
            },
          },
          style: {
            button: {
              borderRadius: "9999px",
              padding: "0.75rem 1rem",
              transition: "all 0.3s ease",
            },
            input: {
              borderRadius: "0.5rem",
              padding: "0.75rem 1rem",
            },
            label: {
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
            },
          },
        }}
        providers={["google", "github"]}
        redirectTo={`${window.location.origin}/auth/callback`}
        localization={{
          variables: {
            sign_in: {
              email_label: "البريد الإلكتروني",
              password_label: "كلمة المرور",
              button_label: "تسجيل الدخول",
              loading_button_label: "جاري تسجيل الدخول...",
              social_provider_text: "تسجيل الدخول باستخدام {{provider}}",
              link_text: "لديك حساب بالفعل؟ قم بتسجيل الدخول",
            },
            sign_up: {
              email_label: "البريد الإلكتروني",
              password_label: "كلمة المرور",
              button_label: "إنشاء حساب",
              loading_button_label: "جاري إنشاء الحساب...",
              social_provider_text: "إنشاء حساب باستخدام {{provider}}",
              link_text: "ليس لديك حساب؟ قم بإنشاء حساب جديد",
              confirmation_text: "تم إرسال رابط التأكيد إلى بريدك الإلكتروني",
            },
          },
        }}
        view={view}
        showLinks={false}
      />
    </div>
  );
};