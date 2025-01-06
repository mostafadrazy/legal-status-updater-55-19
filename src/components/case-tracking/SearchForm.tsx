import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchFormProps {
  onSearch: (caseCode: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [caseCode, setCaseCode] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(caseCode);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="ابحث برقم القضية، اسم العميل، أو رقم الكود..."
          className="w-full pl-4 pr-12 py-3 bg-white/5 border-white/10 text-white placeholder:text-gray-400 rounded-xl"
          value={caseCode}
          onChange={(e) => setCaseCode(e.target.value)}
          dir="rtl"
        />
      </div>
    </form>
  );
}