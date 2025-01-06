import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="relative">
        <Search className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="ابحث برقم القضية، اسم العميل، أو رقم الكود..."
          className="w-full pl-4 pr-12 py-3 glass-input rounded-xl"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          dir="rtl"
        />
      </div>
    </div>
  );
};