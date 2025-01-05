import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFormProps {
  onSearch: (caseCode: string) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [caseCode, setCaseCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseCode.trim()) return;
    onSearch(caseCode);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Input
          value={caseCode}
          onChange={(e) => setCaseCode(e.target.value)}
          placeholder="أدخل رمز القضية..."
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
        />
        <Button 
          type="submit"
          disabled={isLoading}
          className="absolute left-0 top-0 h-full bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}