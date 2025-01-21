import { Auth } from "@/components/Auth";
import { Link } from "react-router-dom";

interface LoginProps {
  view?: "sign_in" | "sign_up";
}

const Login = ({ view = "sign_in" }: LoginProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111] to-[#1A1A1A] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {view === "sign_in" ? "مرحباً بك" : "إنشاء حساب جديد"}
            </h2>
            <p className="text-gray-400">
              {view === "sign_in" 
                ? "قم بتسجيل الدخول للوصول إلى حسابك"
                : "قم بإنشاء حساب جديد للوصول إلى خدماتنا"
              }
            </p>
          </div>
          <Auth view={view} />
          <div className="mt-4 text-center">
            <Link
              to={view === "sign_in" ? "/auth/signup" : "/auth/login"}
              className="text-[#4CD6B4] hover:text-[#3BC5A3] transition-colors"
            >
              {view === "sign_in"
                ? "ليس لديك حساب؟ قم بإنشاء حساب جديد"
                : "لديك حساب بالفعل؟ قم بتسجيل الدخول"
              }
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;