import { Search as SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export function Search({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative group">
      <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4CD6B4] transition-all duration-300 group-hover:scale-110" />
      <Input
        {...props}
        className="w-full pl-4 pr-12 py-3 bg-[#4CD6B4]/10 border-[#4CD6B4]/20 text-white 
          placeholder:text-gray-400 rounded-xl 
          focus:ring-2 focus:ring-[#4CD6B4]/50 focus:border-[#4CD6B4]/30
          hover:bg-[#4CD6B4]/20 hover:border-[#4CD6B4]/30
          transition-all duration-300 transform hover:scale-[1.02]"
        placeholder="البحث في القضايا..."
      />
    </div>
  );
}