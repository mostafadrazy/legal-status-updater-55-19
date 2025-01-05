import { useNavigate } from "react-router-dom";

export function SidebarLogo() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center gap-2 px-2 py-4 cursor-pointer" onClick={() => navigate("/")}>
      <img 
        src="/lovable-uploads/b088cc7a-5a8d-492c-a99e-f48c6dac1906.png" 
        alt="Logo" 
        className="w-8 h-8"
      />
      <span className="text-white font-semibold">مكتب المحاماة</span>
    </div>
  );
}