import { Search as SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export function Search({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative group">
      <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4CD6B4] transition-all duration-300 group-hover:scale-110" />
      <Input
        {...props}
        className="w-full pl-4 pr-12 py-3 bg-[#1E293B] border-[#334155] text-white 
          placeholder:text-gray-400 rounded-xl 
          focus:ring-2 focus:ring-[#4CD6B4]/50 focus:border-[#4CD6B4]/30
          hover:bg-[#334155] hover:border-[#4CD6B4]/20
          transition-all duration-300"
        placeholder="البحث في القضايا..."
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#4CD6B4]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
    </div>
  );
}