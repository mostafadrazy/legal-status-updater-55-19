import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileCompletionForm } from "./auth/ProfileCompletionForm";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface AuthProps {
  view?: "sign_in" | "sign_up";
}

export const Auth = ({ view = "sign_in" }: AuthProps) => {
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_IN') {
        if (rememberMe) {
          // Set session persistence to 'local' for remembered sessions
          await supabase.auth.updateSession({
            refresh_token: session?.refresh_token,
            access_token: session?.access_token,
          });
        }
        
        if (view === 'sign_up') {
          setShowProfileCompletion(true);
        } else {
          navigate('/');
        }
      } else if (event === 'SIGNED_OUT') {
        navigate('/auth/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [view, navigate, rememberMe]);

  if (showProfileCompletion) {
    return <ProfileCompletionForm />;
  }

  return (
    <div className="w-full space-y-6">
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
      
      {view === "sign_in" && (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            className="border-white/20 data-[state=checked]:bg-[#4CD6B4] data-[state=checked]:border-[#4CD6B4]"
          />
          <Label
            htmlFor="rememberMe"
            className="text-sm text-white cursor-pointer select-none"
          >
            تذكرني
          </Label>
        </div>
      )}
    </div>
  );
};