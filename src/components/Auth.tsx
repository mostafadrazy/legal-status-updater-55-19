import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

export const Auth = () => {
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <SupabaseAuth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#2563eb",
                brandAccent: "#1d4ed8",
              },
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
            },
            sign_up: {
              email_label: "البريد الإلكتروني",
              password_label: "كلمة المرور",
              button_label: "إنشاء حساب",
            },
          },
        }}
      />
    </div>
  );
};