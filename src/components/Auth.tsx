import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileCompletionForm } from "./auth/ProfileCompletionForm";
import { toast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";

interface AuthProps {
  view?: "sign_in" | "sign_up";
}

export const Auth = ({ view = "sign_in" }: AuthProps) => {
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_IN') {
        if (view === 'sign_up') {
          setShowProfileCompletion(true);
        } else {
          navigate('/');
        }
      } else if (event === 'SIGNED_OUT') {
        navigate('/auth/login');
      } else if (event === 'USER_UPDATED') {
        const { error } = await supabase.auth.getSession();
        if (error) {
          handleAuthError(error);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [view, navigate]);

  const handleAuthError = (error: AuthError) => {
    console.error('Auth error:', error);
    let message = 'حدث خطأ أثناء المصادقة. يرجى المحاولة مرة أخرى.';
    
    if (error.message.includes('user_already_exists')) {
      message = 'البريد الإلكتروني مسجل مسبقاً. يرجى تسجيل الدخول.';
    } else if (error.message.includes('invalid_credentials')) {
      message = 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
    }
    
    toast({
      variant: "destructive",
      title: "خطأ",
      description: message,
    });
  };

  if (showProfileCompletion) {
    return <ProfileCompletionForm />;
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