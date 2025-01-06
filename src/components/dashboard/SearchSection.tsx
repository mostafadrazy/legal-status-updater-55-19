import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchSection({ searchQuery, onSearchChange }: SearchSectionProps) {
  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="group relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4CD6B4] transition-all duration-300 group-hover:scale-110" />
        <Input
          type="text"
          placeholder="ابحث برقم القضية، اسم العميل، أو رقم الكود..."
          className="w-full pl-4 pr-12 py-3 bg-[#4CD6B4]/10 border-[#4CD6B4]/20 text-white 
            placeholder:text-gray-400 rounded-xl 
            focus:ring-2 focus:ring-[#4CD6B4]/50 focus:border-[#4CD6B4]/30
            hover:bg-[#4CD6B4]/20 hover:border-[#4CD6B4]/30
            transition-all duration-300 transform hover:scale-[1.02]"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          dir="rtl"
        />
      </div>
    </div>
  );
}