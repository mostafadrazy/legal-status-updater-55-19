import React from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchFormProps {
  onSearch: (caseCode: string) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [caseCode, setCaseCode] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(caseCode);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        {isLoading ? (
          <Loader2 className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 animate-spin" />
        ) : (
          <Search className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
        )}
        <Input
          type="text"
          placeholder="ابحث برقم القضية، اسم العميل، أو رقم الكود..."
          className="glass-input rounded-xl"
          value={caseCode}
          onChange={(e) => setCaseCode(e.target.value)}
          disabled={isLoading}
          dir="rtl"
        />
      </div>
    </form>
  );
}