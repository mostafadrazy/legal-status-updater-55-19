import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="relative">
        <SearchIcon className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="ابحث برقم القضية، اسم العميل، أو رقم الكود..."
          className="w-full pl-4 pr-12 py-3 bg-white/5 border-white/10 text-white placeholder:text-gray-400 rounded-xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          dir="rtl"
        />
      </div>
    </div>
  );
}