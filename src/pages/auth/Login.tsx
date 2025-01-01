import { Auth } from "@/components/Auth";

const Login = () => {
  return (
    <div className="min-h-screen bg-legal-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card rounded-lg p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-6 text-legal-800">تسجيل الدخول</h2>
        <Auth />
      </div>
    </div>
  );
};

export default Login;