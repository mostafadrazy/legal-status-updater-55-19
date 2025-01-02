import { Auth } from "@/components/Auth";

const Login = () => {
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
            <h2 className="text-2xl font-bold text-white mb-2">مرحباً بك</h2>
            <p className="text-gray-400">قم بتسجيل الدخول للوصول إلى حسابك</p>
          </div>
          <Auth />
        </div>
      </div>
    </div>
  );
};

export default Login;