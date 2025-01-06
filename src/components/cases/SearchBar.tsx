import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="group relative">
        <Search className="absolute right-4 top-3.5 h-5 w-5 text-[#4CD6B4] transition-all duration-300 group-hover:scale-110" />
        <Input
          type="text"
          placeholder="ابحث برقم القضية، اسم العميل، أو رقم الكود..."
          className="w-full pl-4 pr-12 py-3 glass-input rounded-xl 
          focus:ring-2 focus:ring-[#4CD6B4]/50 focus:border-[#4CD6B4]/30
          hover:bg-white/10 hover:border-[#4CD6B4]/20
          transition-all duration-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          dir="rtl"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#4CD6B4]/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
      </div>
    </div>
  );
}