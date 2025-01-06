import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface SearchFormProps {
  onSearch: (caseNumber: string) => void;
  isLoading?: boolean;
}

export function SearchForm({ onSearch, isLoading = false }: SearchFormProps) {
  const [caseNumber, setCaseNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseNumber.trim()) {
      toast.error("الرجاء إدخال رقم القضية");
      return;
    }
    onSearch(caseNumber);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
      <div className="group relative flex gap-2">
        <div className="relative flex-1">
          {isLoading ? (
            <Loader2 className="absolute right-4 top-3.5 h-5 w-5 text-[#4CD6B4] animate-spin" />
          ) : (
            <Search className="absolute right-4 top-3.5 h-5 w-5 text-[#4CD6B4] transition-all duration-300 group-hover:scale-110" />
          )}
          <Input
            type="text"
            placeholder="أدخل رقم القضية للبحث..."
            className="w-full pl-4 pr-12 py-3 bg-gradient-to-r from-white/5 to-white/10 border-white/10 text-white placeholder:text-gray-400 rounded-xl 
            focus:ring-2 focus:ring-[#4CD6B4]/50 focus:border-[#4CD6B4]/30
            hover:bg-white/10 hover:border-[#4CD6B4]/20
            transition-all duration-300"
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
            disabled={isLoading}
            dir="rtl"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#4CD6B4]/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
        </div>
        <Button 
          type="submit"
          disabled={isLoading}
          className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black font-semibold px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#4CD6B4]/20"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              جاري البحث...
            </>
          ) : (
            "بحث"
          )}
        </Button>
      </div>
    </form>
  );
}