import { Search as SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export function Search({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <SearchIcon className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
      <Input
        {...props}
        className="pr-8 bg-[#222] border-gray-700 text-gray-200 placeholder:text-gray-500"
        placeholder="البحث في القضايا..."
      />
    </div>
  );
}