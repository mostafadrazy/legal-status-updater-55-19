import { useNavigate } from "react-router-dom";

export function SidebarLogo() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center px-2 py-6 cursor-pointer" onClick={() => navigate("/")}>
      <img 
        src="/lovable-uploads/b088cc7a-5a8d-492c-a99e-f48c6dac1906.png" 
        alt="Logo" 
        className="w-20 h-20 object-contain hover:scale-105 transition-transform duration-200"
      />
    </div>
  );
}